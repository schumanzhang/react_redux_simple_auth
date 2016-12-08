const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
const passport = require('passport');
var User = require('../models/user');
require("../passport");

router
    .post('/register', (req, res, next) => {
        req.checkBody("firstName", "required field").notEmpty();
        req.checkBody("lastName", "required field").notEmpty();
        req.checkBody("email", "Email address must be valid").notEmpty().isEmail();
        req.checkBody("password", "required field").notEmpty();
        req.checkBody("password2", "required field").notEmpty();
        var validationErrors = req.validationErrors();
        if (validationErrors) {
            res.send(400, validationErrors);
            return;
        }
        if (req.body.password !== req.body.password2) {
            res.send(400, "passwords don't match");
            return;
        }
        console.log('User:', User);
        User.getUserByEmail(req.body.email, function(err, user){
            if(user) {
                res.send(400, "there's already a user with this email address");
                return;
            }
        });

        var newUser = new User({
            email: req.body.email,
            username: req.body.email,
            password: req.body.password,
            firstname: req.body.firstName,
            lastname: req.body.lastName,
            roles: ['user']
        });
        
        User.createUser(newUser, function(err, user) {
            //console.log('added user:', user);
            if(err) throw err;
            req.login(user, function(err) { //passport method      
                if(err) {
                    return err;
                }
                res.json(user);
                console.log('Success, user created and logged in');
            });
        });  
    })

    .post('/login', passport.authenticate('local'), (req, res) => {
        res.json(req.user);
    })

    .post('/logout', (req, res) => {
        //console.log(req);
        req.session.destroy();
    })

    .post('/checkUser', (req, res) => {
        console.log('Checking user login');
        if(req.isAuthenticated()){
            console.log('User authenticated');
            res.send(req.user);
        } else {
            res.send('0');
        }
    });

//TODO
// We need reset password and change password routes
// We need OAuth with Google
// Need to investigate if passport works with mobile devices

module.exports = router;