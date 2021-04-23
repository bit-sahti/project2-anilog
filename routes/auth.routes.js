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
    console.log('Get request on sign up route')
    res.render('signup')
})

router.post('/signup', async (req, res, next) => {
    console.log('Post request on sign up route');
    
    const { username, email, birthDate, password, resetPassQuestion, resetPassAnswer } = req.body

    console.log(birthDate);

    console.log(typeof birthDate);

    const newUser = {
        username,
        email,
        birthDate,
        password: encrypt(password),
        resetPassQuestion,
        resetPassAnswer: encrypt(resetPassAnswer)
    }

    try {
        const userExists = await User.findOne({ email: email }) ? true : false
        const nameTaken = await User.findOne({ username }) ? true : false

        if (userExists || nameTaken) {
            // console.log(userFromDb, nameTaken)
            return res.render('signup', { fields: req.body, userExists, nameTaken })
        }


        const currentUser = await User.create(newUser);

        console.log(currentUser);

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

        console.log(req.session.currentUser);

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