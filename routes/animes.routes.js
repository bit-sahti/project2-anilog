const router = require('express').Router();
const User = require('../models/User');
const Anime = require('../models/Anime')
const AniList = require('./utils/backApiHandler')

router.get('/', async (req, res, next) => {
    const { id: animeId } = req.query;
    
    let onToWatchList = false;
    let onWatchedList = false;
    let onWatchingList = false;
    let onFavoritesList = false;

   try {
    let anime = await Anime.findOne({ externalId: animeId });

    if (anime && req.session.currentUser) {
        const { _id: userId } = req.session.currentUser;

        onToWatchList = anime.toBeWatchedBy.includes(userId);
        onWatchingList = anime.beingWatchedBy.includes(userId);
        onWatchedList = anime.watchedBy.includes(userId);
        onFavoritesList = anime.favoriteOf.includes(userId);

        console.log(onToWatchList, onWatchingList, onWatchedList, onFavoritesList)

    } else {
        anime = await AniList.getAnime(animeId);
    }  

    res.render('./animes/anime', { 
        anime: anime, 
        currentUser: req.session.currentUser,
        onToWatchList,
        onWatchedList,
        onWatchingList,
        onFavoritesList        
     })
   }

   catch(err) {
       console.log(err);
   }
})

router.get('/add', async (req, res, next) => {
    const { _id: userId } = req.session.currentUser;
    const { id: animeId, userList, animeList } = req.query;
    const currentUser = await User.findById(userId);

    console.log(req.query);
    
   try {
    let anime = await Anime.findOne({ externalId: animeId });

    console.log('from db ========> ', anime ? anime._id : 'null')

    if (!anime) {
        animeFromAPI = await AniList.getAnime(animeId);

        console.log('from API =========>', animeFromAPI.externalId);

        anime = await Anime.create(animeFromAPI)
    }

    if (!anime[animeList].includes(userId)) {
        anime[animeList].push(userId)
        
        await anime.save()
    }

    if (!currentUser[userList].includes(anime._id)) {
        currentUser[userList].push(anime._id);
        await currentUser.save()
    }    

    console.log('operation completed ========>', currentUser[userList], anime._id, anime[animeList], currentUser._id)

    res.redirect(`/anime/?id=${anime.externalId}`)
   }

   catch(err) {
    console.log('error ========> ', err);
    }
})

router.get('/remove', async (req, res, next) => {
    const { _id: userId } = req.session.currentUser;
    const { id: animeId, userList, animeList } = req.query;
    const currentUser = await User.findById(userId);

    console.log(req.query);
    
   try {
    const anime = await Anime.findOne({ externalId: animeId });
    const animeListIndex = anime[animeList].indexOf(userId);
    const userListIndex = currentUser[userList].indexOf(anime._id);

    console.log('before removal', animeListIndex, userListIndex );

    anime[animeList].splice(animeListIndex, 1)
    currentUser[userList].splice(userListIndex, 1)

    await anime.save();
    await currentUser.save();

    console.log('after removal',animeListIndex, userListIndex );


    res.redirect(`/anime/?id=${anime.externalId}`)
   }

   catch(err) {
    console.log('error ========> ', err);
    }
})
module.exports = router;