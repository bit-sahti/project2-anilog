const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require('bcrypt');

const encrypt = (word) => {
    const salt = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(word, salt);
}

const decrypt = (password, hash) => {
    return  bcrypt.compareSync(password, hash);
}

router.get('/signup', (req, res, next) => {
    console.log('Get request on sign up route')
    res.render('signup')
})

router.post('/signup', async (req, res, next) => {
    console.log('Post request on sign up route');
    
    const { username, email, birthDate, password, resetPassQuestion, resetPassAnswer } = req.body

    const newUser = {
        username,
        email,
        birthDate,
        password: encrypt(password),
        resetPassQuestion,
        resetPassAnswer: encrypt(resetPassAnswer)
    }

    try {
        User.create(newUser)
        
        res.redirect('/login')
    }

    catch(err) {
        console.log(err);
    }
})

module.exports = router;