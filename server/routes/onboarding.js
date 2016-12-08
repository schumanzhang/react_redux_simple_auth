const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
var User = require('../models/user');

var Profile = require('../models/profile');

//create Profile info
//get profile info
//update profile info

router
    .all('/*', requireAuth, function(req, res, next) {
        next();
    })

    .post('/profile', function(req, res) {
        //add field validations here
        console.log('update profile:', req.body);
        req.checkBody("company", "required field").notEmpty();
        req.checkBody("type", "required field").notEmpty();
        req.checkBody("description", "required field").notEmpty();
        req.checkBody("employees", "required field").notEmpty();
        req.checkBody("contact", "required field").notEmpty();
        //req.checkBody("email", "Email address must be valid").notEmpty().isEmail();
        var validationErrors = req.validationErrors();
        if (validationErrors) {
            res.send(400, validationErrors);
            return;
        }

        var newProfile = {
            company: req.body.company,
            type: req.body.type,
            description: req.body.description,
            employees: req.body.employees,
            contact: req.body.contact
        };
        
        Profile.updateProfile(newProfile, req.body._id, User, function(profile, err) {
            if (profile !== null) {
                console.log('profile details updated');
                res.send(200, 'profile details updated');
                res.json(profile);
            } else {
                console.log('error occured');
                res.send(400, 'error occured');
                res.json(err);
            }
        });  
    });

//require login middleware function 
function requireAuth(req, res, next) {
    if (req.isAuthenticated) {
        next();
    } else {
        res.sendStatus(401);
    }
}

module.exports = router;

//Add white labelling options later