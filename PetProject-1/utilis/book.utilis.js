const db = require("../db");


const getCountItem = (req) => {
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
	return totalItem;
}
module.exports = getCountItem;