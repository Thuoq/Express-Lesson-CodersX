const db = require('../db');
exports.authSignIn  = (req,res) => {
	res.render("authentication/signin")
}
exports.authSignInPost = (req,res) => {
	const{email,name,password} = req.body;
	const trancationUser = db.get("trancations").filter({name: name}).value();

	res.locals.user = name;
	res.render("trancations/trancation",{
		trancations: trancationUser,
	})

}

exports.authSignOut = (req,res) => {
	res.clearCookie("userId");
	res.redirect("/auth")
}