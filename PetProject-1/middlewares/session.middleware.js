const db = require("../db");
module.exports = (req,res,next) => {
	let getSession = db.get("sessions").value();
	if(!req.signedCookies.sessionId) {
		let idSession = getSession.length + 1 ;
		res.cookie('sessionId', idSession ,{ 
			signed:true
		});
		db.get("sessions").push({
			idSession,
			cart: {},
		}).write();
	}
	next();
}