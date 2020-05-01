const db = require('../db');
exports.authSignIn  = (req,res) => {
	res.render("authentication/signin")
}
exports.authSignInSuceess = (req,res) => {
	const{email,name,password,confirmPassword} = req.body;
	const trancationUser = db.get("trancations").filter({name: name}).value();
	if(!confirmPassword){
		let userName = db.get("users").find({email: email}).value();
		db.get("users").set(`users[${userName.idUser}-1].isPassword`,0)
	}
	res.redirect("/trancation")
	res.render("trancations/trancation",{
		trancations: trancationUser,
	})
	
}

exports.authSignOut = (req,res) => {
	res.clearCookie("userId");
	res.redirect("/auth")
}

exports.authSignUp = (req,res) => {
	res.render("authentication/signup")
}

