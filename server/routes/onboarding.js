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
        var newProfile = new Profile({
            company: req.body.company,
            type: req.body.type,
            description: req.body.description,
            employees: req.body.employees,
            contact: req.body.contact
        });
        
        Profile.createProfile(newProfile, function(err, profile) {
            console.log('profile added:', profile);
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


//Add white labelling options later