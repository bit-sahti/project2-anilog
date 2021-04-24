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
            const userId = req.session.currentUser;
            
            onToWatchList = anime.userActivity.toBeWatchedBy.includes(userId);
            onWatchingList = anime.userActivity.beingWatchedBy.includes(userId);
            onWatchedList = anime.userActivity.watchedBy.includes(userId);
            onFavoritesList = anime.userActivity.favoriteOf.includes(userId);
            
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
        next(err);
    }
})



module.exports = router;