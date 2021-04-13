const router = require('express')();
const Anime = require('../models/Anime')
const User = require('../models/User')

router.get('/', (req, res, next) => {
    console.log('Get request on root completed');

    req.session.currentUser ? res.render('index', { currentUser: req.session.currentUser}) 
                            : res.render('index')
});

module.exports = router;