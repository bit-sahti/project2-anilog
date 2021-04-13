const router = require('express').Router();
const User = require('../models/User');
const Anime = require('../models/Anime')
const AniList = require('./utils/backApiHandler')

router.get('/', async (req, res, next) => {
   try {
    const anime = await AniList.getAnime(req.query.id);

    res.render('./animes/anime', { anime: anime, currentUser: req.session.currentUser })
   }

   catch(err) {
       console.log(err);
   }
})

router.get('/add', async (req, res, next) => {
    const { _id: userId } = req.session.currentUser
    const { id: animeId, list } = req.query

    console.log(req.query);
    
   try {
    let anime = await Anime.findOne({ externalId: animeId });

    if (!anime) {
        animeFromAPI = await AniList.getAnime(animeId);

        console.log(animeFromAPI)

        anime = await Anime.create(animeFromAPI)

    }
    console.log(anime.toBeWatchedBy)
   }
   catch(err) {
    console.log(err);
}
})

module.exports = router;