const router = require('express')();
const Anime = require('../models/Anime');
const User = require('../models/User');
const aniList = require('./utils/backApiHandler');
const queryMapper = require('./utils/queryMapper')

router.get('/', async (req, res, next) => {
    console.log('Get request on root completed');
    
    try {
        if (!Object.keys(req.query).length) {
            console.log('no query ====>', req.query);

            return res.redirect('/?seasonYear=2021&season=spring&sort=popularity_desc&perPage=30&page=1')
        }

        const queryParams = queryMapper.map(req.query);
        const media = await aniList.searchMedia(req.query);

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