//Require packages
require('dotenv').config();

const express = require('express');
const hbs = require('hbs');

//Initialize the app
const app = express();

//Connect to database
require('./configs/mongodb');

//Set the session
session = require('./configs/session');
session(app)

//Set body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Set HBS
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

//Set static files path
app.use(express.static('public'));

//Import and set main route;
const mainRoutes = require('./routes/main.route');
app.use('/', mainRoutes)

const authRoutes = require('./routes/auth.routes');
app.use('/', authRoutes)

app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}`))

