const router = require('express').Router();
const Anime = require('../models/Anime')
const User = require('../models/User')
const aniList = require('../controllers/apiHandler')

router.get('/', (req, res, next) => {
    console.log('Get request on root completed');

    res.render('index')
});

router.post('/', async (req, res, next) => {
    aniList.searchMedia(req.body);
})

module.exports = router;