const router = require('express')();
const Anime = require('../models/Anime');
const User = require('../models/User');
const aniList = require('./utils/backApiHandler')

router.get('/', async (req, res, next) => {
    console.log('Get request on root completed');

    if (typeof req.query.genre_in === 'object') {
        req.query.genre_in.forEach(genre => {
            req.query[genre] = true;
        })
    } else if (req.query.length) {
        req.query[req.query.genre_in] = true;
    }

    
    console.log(req.query);


    try {
        const media = await aniList.searchMedia(req.query)


        req.session.currentUser ? res.render('index', { currentUser: req.session.currentUser, query: req.query, pageInfo: media.pageInfo, animes: media.animes }) 
                                : res.render('index', { query: req.query, pageInfo: media.pageInfo, animes: media.animes })
        }

    catch (error) {
        console.log(error);
    }
});

router.post('/', (req, res, next) => {
    console.log(req.body)
})

module.exports = router;