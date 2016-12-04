const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/virtuoso');
require('./passport');


const app = express();
const staticAssets = __dirname + "/../client/src";
const auth = require('./routes/auth');
const onboarding = require('./routes/onboarding');

app
    .use(express.static(staticAssets))
    .use(bodyParser.json())
    .use(expressValidator({
        errorFormatter: function(param, msg, value) {
            var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

            while(namespace.length) {
                formParam += '[' + namespace.shift() + ']';
            }
            return {
                param : formParam,
                msg   : msg,
                value : value
            };
        }
    }))
    .use(session({ secret: "I love huskies", resave: false, saveUninitialized: false })) //req.session available
    .use(passport.initialize())
    .use(passport.session())
    .use(bodyParser.urlencoded({extended: false}))
    .use('/auth', auth)
    .use('/onboarding', onboarding);



module.exports = app;
