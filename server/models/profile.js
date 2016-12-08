const mongoose = require('mongoose');

var UserProfileSchema = mongoose.Schema({
   company: String,
   type: String,
   description: String,
   employees: Number,
   contact: String
});

var profileSchema = module.exports = UserProfileSchema;

// add Profile info
module.exports.updateProfile = function(newProfile, id, User, callback) {
    var query = {_id : id};
    User.findOneAndUpdate(query, {$push:{profile: newProfile}}, {upsert: true, new: true}).then(function(user) {
        callback(user);
    }, function(err) {
        callback(null, err);
    });
}





