const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require('bcrypt');
const session = require('../configs/session');

const encrypt = (word) => {
    const salt = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(word, salt);
}

const decrypt = (password, hash) => {
    return  bcrypt.compareSync(password, hash);
}

router.get('/signup', (req, res, next) => {
    res.render('signup')
})

router.post('/signup', async (req, res, next) => {
    
    const { username, email, birthDate, password, resetPassQuestion, resetPassAnswer } = req.body;

    const newUser = {
        username,
        email,
        birthDate,
        password: encrypt(password),
        resetPassQuestion,
        resetPassAnswer: encrypt(resetPassAnswer)
    }

    try {
        const userExists = await User.findOne({ email: email }) ? true : false;
        const nameTaken = await User.findOne({ username }) ? true : false;

        if (userExists || nameTaken) {
            return res.render('signup', { fields: req.body, userExists, nameTaken })
        }

        const currentUser = await User.create(newUser);

        req.session.currentUser = currentUser._id;
        
        res.redirect(`/${currentUser._id}/profile`)
    }

    catch(err) {
        console.log(err);
    }
})

router.get('/login', (req, res, next) => {
    res.render('login')
})

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const userFromDb = await User.findOne({ email })

        if (!userFromDb) res.redirect('/signup');

        if (!decrypt(password, userFromDb.password)) {
            return res.render('login', { authError: 'Email ou senha incorretos' })
        }
        
        req.session.currentUser = userFromDb._id;

        res.redirect('/')
    }

    catch(err) {
        console.log(err);
    }
})

router.get('/logout', (req, res, next) => {
    req.session.destroy();

    res.redirect('/')
})

module.exports = router;