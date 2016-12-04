const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var Profile = require('./profile');

//user Schema
var UserSchema = mongoose.Schema({
    email: String,
	username: String,
	password: String,
	firstname: String,
    lastname: String,
    roles: [String],
	profile: Profile
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
    //hashing the password before saving
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByEmail = function(email, callback) {
    var query = {email: email};
    User.findOne(query, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}