const db = require("../db");


exports.verifyCheckOutPage = (req,res,next) => {
	const {userId} = req.signedCookies;
	if(!userId) {
		res.redirect("/auth");
		return;
	}
	let {name} = db.get("users").find({idUser : userId * 1 }).value();
	res.locals.user = {name: name};
	next();
}
