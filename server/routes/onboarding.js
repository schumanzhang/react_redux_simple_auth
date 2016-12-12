const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
var User = require('../models/user');

var Profile = require('../models/profile');
var Client = require('../models/client');

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
                //console.log('profile details updated');
                res.sendStatus(200, 'profile details updated');
                res.json(profile);
            } else {
                console.log('error occured');
                res.sendStatus(400, 'error occured');
                res.json(err);
            }
        });  
    })

    .post('/addClient', function(req, res) {
        console.log('addClient:', req.body);
        req.checkBody("firstName", "required field").notEmpty();
        req.checkBody("lastName", "required field").notEmpty();
        req.checkBody("email", "Email address must be valid").notEmpty().isEmail();

        var validationErrors = req.validationErrors();
        if (validationErrors) {
            res.send(400, validationErrors);
            return;
        }

        var newClient = new Client({
            firstname: req.body.firstName,
            lastname: req.body.lastName,
            email: req.body.email,
            accepted: false
        });

        Client.createClient(newClient, req.body._id, User, function(client, err) {
            if (client !== null) {
                res.sendStatus(200, 'added first client');
                res.json(client);
            } else {
                console.log('error occured');
                res.sendStatus(400, 'error occured');
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