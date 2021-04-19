const router = require('express')();
const Anime = require('../models/Anime');
const User = require('../models/User');
const aniList = require('./utils/backApiHandler');
const queryMapper = require('./utils/queryMapper')

router.get('/', async (req, res, next) => {
    console.log('Get request on root completed');
    
    try {

        console.log(req.query);
        const queryParams = queryMapper.map(req.query);
        const media = await aniList.searchMedia(req.query)

        // console.log(media);

        req.session.currentUser ? res.render('index', { currentUser: req.session.currentUser, query: queryParams, pageInfo: media.pageInfo, animes: media.animes }) 
                                : res.render('index', { query: queryParams, pageInfo: media.pageInfo, animes: media.animes })
        }

    catch (error) {
        console.log(error);
    }
});

router.post('/', (req, res, next) => {
    console.log(req.body)
})

module.exports = router;