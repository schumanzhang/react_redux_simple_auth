const mongoose = require('mongoose');

var ClientSchema = mongoose.Schema({
    email: String,
	username: String,
	password: String,
	firstname: String,
    lastname: String,
    roles: [String],
	profile: [profileSchema]
});

var Client = module.exports = mongoose.model('Client', ClientSchema);