const mongoose = require('mongoose');
var User = require('./user');

var UserProfileSchema = mongoose.Schema({
   company: String,
   type: String,
   description: String,
   employees: Number,
   contact: String
});

var Profile = module.exports = mongoose.model('Profile', UserProfileSchema);

// add Profile info

module.exports.updateProfile = function(newProfile, email, callback) {
    newProfile.save().then(function (result) {
        User.findOneAndUpdate({email: email}, {$push:{profile: newProfile}}, {new: true}, function(err, doc){
		    callback(err, doc);
	    });
    });
}

    /*
	User.findOneAndUpdate({email: email}, {$set:{profile: newProfile}}, {new: true}, function(err, doc){
		callback(err, doc);
	});
    */






