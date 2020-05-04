const db = require('../db');
exports.authSignIn  = (req,res) => {
	res.render("authentication/signin")
}
exports.authSignInSuceess = (req,res) => {
	res.redirect("/trancation")
}
exports.authSignOut = (req,res) => {
	res.clearCookie("userId");
	res.redirect("/auth");
}
exports.authSignUp = (req,res) => {
	res.render("authentication/signup")
}

