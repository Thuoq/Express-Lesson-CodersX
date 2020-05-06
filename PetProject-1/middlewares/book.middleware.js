const db = require("../db");


exports.verifyCheckOutPage = (req,res,next) => {
	const {userId} = req.signedCookies;
	if(!userId) {
		res.redirect("/auth");
		return;
	}
	next();
}