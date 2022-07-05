const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username : { type: String, required: true, minLenght: 6 },
	email    : { type: String, required: true, unique: true, match: /.+@.+\..+/ },
	password : { type: String, required: true, minLenght: 7 },
	firstName: { type: String, required: false, minLenght: 6 },
	lastName : { type: String, required: false },
	token    : { type: String }
});

const UserModel      = mongoose.model("User", UserSchema);
module.exports = UserModel;
