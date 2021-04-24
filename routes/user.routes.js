const router = require('express').Router();

const User = require('../models/User');
const Anime = require('../models/Anime');
const AniList = require('./utils/backApiHandler');

const fileUploader = require('../configs/cloudinary.config'); 

router.get('/:userId/profile', async (req, res, next) => {
    try {
        const { currentUser } = req.session;
        const profileUser = await User.findOne({ _id: req.params.userId })

        let isCurrentUser;

        if (currentUser && profileUser._id.toString() === currentUser.toString()) {
            isCurrentUser = true;
        }

        res.render('./user/profile', { currentUser: req.session.currentUser, profileUser, isCurrentUser })

    }

    catch(err) {
        console.log(err);
    }
})

router.get('/:userId/lists', async (req, res, next) => {
    const { userId } = req.params;
    const currentUser = req.session.currentUser ? req.session.currentUser : null;
    const isCurrentUser = userId === req.session.currentUser ? true : false;

    try {
        const user = await User.findById({ _id: userId })
                            .populate('lists.favorites')
                            .populate('lists.watching')
                            .populate('lists.watched')
                            .populate('lists.toWatch')

        const { favorites, watching, watched, toWatch } = user.lists;

        const animes = {
            favorites: favorites.slice().reverse(),
            watched:  watched.slice().reverse(),
            watching: watching.slice().reverse(),
            toWatch: toWatch.slice().reverse()
        }

        res.render('./user/lists', { lists: animes, listsOwner: user, currentUser, isCurrentUser})
    }

    catch (err) {
        console.log(err)
    }

})

//Protection route
router.use('/', (req, res, next) => {
    const { currentUser } = req.session;

    if (!currentUser) return res.redirect('/login');

    // if (currentUser !== userId) return res.send('Permission denied.')

    next();
})

//Edition routes
router.get('/:userId/profile/edit', async (req, res, next) => {
    try {
        const user = await User.findById(req.session.currentUser);

        const profileUser = {
            username: user.username,
            avatarPicture: user.avatarPicture,
            description: user.description,
            socialMedia: user.socialMedia
        }

        user.preferedGenres.forEach(genre => {
           profileUser[genre] = true;
        })

        res.render('./user/profile-edition', { currentUser: req.session.currentUser, profileUser })
    }

    catch (err) {
        console.log(err);
    }
})

router.post('/:userId/profile/edit', fileUploader.single('avatarPicture'), async (req, res, next) => {
    try {
        const user = await User.findById(req.session.currentUser)
        const { username, preferedGenres, description, facebook, twitter, discord, isPublic } = req.body;
        const nameUser = await User.findOne({ username })

        if (nameUser && nameUser._id.toString() !== user._id.toString()) {
            return res.render('./user/profile-edition', { currentUser: user_id, nameTaken: true, profileUser: user })
        }

        Object.entries(req.body).forEach(( [ prop, value ]) => {
            if (prop === 'facebook' || prop === 'twitter' || prop === 'discord' || prop === 'isPublic') {
                user.socialMedia[prop] = value;
            }

            user[prop] = value;
        })

        if (req.file) {
            user.avatarPicture = req.file.path;
        };

        await user.save();

        res.redirect(`/${user._id}/profile`);
    }

    catch(err) {
        console.log(err);
    }
})

router.get('/:userId/lists/add', async (req, res, next) => {
    const userId = req.session.currentUser;
    const { id: animeId, userList, animeList } = req.query;
    
    try {
    const currentUser = await User.findById(userId);
    let anime = await Anime.findOne({ externalId: animeId });

    if (!anime) {
        animeFromAPI = await AniList.getAnime(animeId);

        anime = await Anime.create(animeFromAPI)
    }

    if (!anime.userActivity[animeList].includes(userId)) {
        anime.userActivity[animeList].push(userId)
        
        await anime.save()
    }

    if (!currentUser.lists[userList].includes(anime._id)) {
        currentUser.lists[userList].push(anime._id);
        await currentUser.save()
    }

    res.redirect('back')
   }

   catch(err) {
    console.log(err);
    }
})

router.get('/:userId/lists/remove', async (req, res, next) => {
    const userId = req.session.currentUser;
    const { id: animeId, userList, animeList } = req.query;
    
    try {
        const currentUser = await User.findById(userId);
        const anime = await Anime.findOne({ externalId: animeId });
        
        const animeListIndex = anime.userActivity[animeList].indexOf(userId);
        const userListIndex = currentUser.lists[userList].indexOf(anime._id);

        anime.userActivity[animeList].splice(animeListIndex, 1)
        currentUser.lists[userList].splice(userListIndex, 1)

        await anime.save();
        await currentUser.save();

        res.redirect('back')
   }

   catch(err) {
        console.log('error ========> ', err);
    }
})

router.get('/:userId/lists/edit', async (req, res, next) => {
    const userId = req.session.currentUser;
    const { id: animeId, currentUserList, currentAnimeList, targetUserList, targetAnimeList } = req.query;
    
    try {
        const currentUser = await User.findById(userId);
        const anime = await Anime.findOne({ externalId: animeId });

        const animeListIndex = anime.userActivity[currentAnimeList].indexOf(userId);
        const userListIndex = currentUser.lists[currentUserList].indexOf(anime._id);

        if (!anime.userActivity[targetAnimeList].includes(userId)) anime.userActivity[targetAnimeList].push(userId)

        if (!currentUser.lists[targetUserList].includes(anime._id)) currentUser.lists[targetUserList].push(anime._id);

        anime.userActivity[currentAnimeList].splice(animeListIndex, 1);
        currentUser.lists[currentUserList].splice(userListIndex, 1);

        await anime.save();
        await currentUser.save();

        res.redirect('back')
   }

   catch(err) {
    console.log('error ========> ', err);
    }
})

module.exports = router;