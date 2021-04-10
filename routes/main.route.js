const router = require('express')();
const Anime = require('../models/Anime')
const User = require('../models/User')

router.get('/', (req, res, next) => {
    console.log('Get request on root completed');

    res.render('index')
});

// router.post('/', async (req, res, next) => {
//     res.send(page)
// })

module.exports = router;