const mongoose = require('mongoose');

var UserProfileSchema = mongoose.Schema({
   company: String,
   type: String,
   description: String,
   employees: Number,
   contact: String
});

var Profile = module.exports = mongoose.model('Profile', UserProfileSchema);

//create Profile
module.exports.createProfile = function(newProfile, callback) {
	newProfile.save(callback);
}





