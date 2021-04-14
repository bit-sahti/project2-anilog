const router = require('express').Router();
const User = require('../models/User');
const Anime = require('../models/Anime')
const AniList = require('./utils/backApiHandler')

router.get('/', async (req, res, next) => {
   try {
    const anime = await AniList.getAnime(req.query.id);

    // let test = encodeURIComponent(JSON.stringify(anime))
    // console.log(JSON.parse(decodeURIComponent(test)))

    res.render('./animes/anime', { anime: anime, currentUser: req.session.currentUser })
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

module.exports = router;