const db = require('../db');
exports.authSignIn  = (req,res) => {
	const {sessionId} = req.signedCookies;
	let getCartItem = db.get("sessions")
		.find({idSession: sessionId * 1}).value().cart;
	let converCartToArr = Object.keys(getCartItem);
	let i = 0;
	let totalItem = 0;
	while(converCartToArr[i]){
		totalItem += getCartItem[converCartToArr[i]];
		i++;
	}
	res.render("authentication/signin",{
		number : totalItem 
	})
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

