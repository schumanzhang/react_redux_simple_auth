const mongoose = require('mongoose');
var profileSchema = require('./profile');

var ClientSchema = mongoose.Schema({
    email: String,
	username: String,
	password: String,
	firstname: String,
    lastname: String,
	accepted: Boolean,
    roles: [String],
	profile: [profileSchema]
});

var Client = module.exports = mongoose.model('Client', ClientSchema);

module.exports.createClient = function(newClient, id, User, callback) {
	newClient.save().then(function (result) {
		return User.findOneAndUpdate(
			{ _id: id },
			{ $push: { clients: result._id } }
		);
	}).then(function (result) {
		callback(result);
	}, function(err) {
		callback(null, err);
	});
}