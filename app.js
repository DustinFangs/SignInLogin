const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');


const app = express();

//Passport config
require('./config/passport')(passport);

//DB Config
const db = require('./config/keys').MongoURI;

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

//global vars
/*app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.errors = req.flash('errors');
    next();
});
//Connect flash
app.use(flash());*/


//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Bodyparser

app.use(express.urlencoded({ extended: false }));

//express session
app.use(session({
    secret: 'dustin',
    resave: true,
    saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());


//Routes
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port${PORT}`));