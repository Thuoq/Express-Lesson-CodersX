const mongoose = require("mongoose");


const userSchema =  new mongoose.Schema({
	name: {
		type: String,
		required: [true,'A user must name ']
	},
	password: {
		type: String,
		required: [true,'A user must password']
	},
	email: {
		type: String,
		required: [true,'A user must  email']
	},
	isAdmin: Number,
	isPassword: Number,
	avatar: {
		type: String,
		default: "uploads/ebc40d0a25b2e7d8b73b703f3ee1baf0"
	}
})

const Users = mongoose.model("Users",userSchema,"users");

module.exports = Users