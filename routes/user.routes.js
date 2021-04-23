const router = require('express').Router();
const User = require('../models/User');
const Anime = require('../models/Anime');
const AniList = require('./utils/backApiHandler')

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

        // console.log(isCurrentUser, userId, currentUser);

        console.log(isCurrentUser);

        res.render('./user/lists', { lists: animes, listsOwner: user, currentUser, isCurrentUser})
    }

    catch (err) {
        console.log(err)
    }

})

router.get('/:userId/lists/add', async (req, res, next) => {
    const userId = req.session.currentUser;
    const { id: animeId, userList, animeList } = req.query;
    
    try {
    const currentUser = await User.findById(userId);
    let anime = await Anime.findOne({ externalId: animeId });

    // console.log('from db ========> ', anime ? anime._id : 'null')

    if (!anime) {
        animeFromAPI = await AniList.getAnime(animeId);

        // console.log('from API =========>', animeFromAPI.externalId);

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

    console.log('operation completed ========>', currentUser.lists[userList], anime._id, anime.userActivity[animeList], currentUser._id)

    res.redirect('back')
   }

   catch(err) {
    console.log('error ========> ', err);
    }
})

router.get('/:userId/lists/remove', async (req, res, next) => {
    console.log('call on remove route');
    const userId = req.session.currentUser;
    const { id: animeId, userList, animeList } = req.query;
    
    try {
        const currentUser = await User.findById(userId);
        const anime = await Anime.findOne({ externalId: animeId });
        
        const animeListIndex = anime.userActivity[animeList].indexOf(userId);
        const userListIndex = currentUser.lists[userList].indexOf(anime._id);

        console.log('before removal', animeListIndex, userListIndex );

        anime.userActivity[animeList].splice(animeListIndex, 1)
        currentUser.lists[userList].splice(userListIndex, 1)

        await anime.save();
        await currentUser.save();

        console.log('after removal',animeListIndex, userListIndex );


        res.redirect('back')
   }

   catch(err) {
        console.log('error ========> ', err);
    }
})

router.get('/:userId/lists/edit', async (req, res, next) => {
    const userId = req.session.currentUser;
    const { id: animeId, currentUserList, currentAnimeList, targetUserList, targetAnimeList } = req.query;

    console.log(req.query);
    
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