const db = require("../db");

exports.getBookCheckOut = (req) => {
	const {sessionId,userId} = req.signedCookies;
	const book = [];
	const storeTitle = [];
	let {cart}  = db.get("sessions").find({idSession: sessionId * 1}).value();
	let {name} = db.get("users").find({idUser : userId * 1 }).value();
	let newCartKey = Object.keys(cart);
	for(let i = 0 ; i  < newCartKey.length ; i ++) {
		if(db.get("books").find({idBook : newCartKey[i] * 1})){
			let newBook = Object.assign({},
										db.get("books")
										.value()[newCartKey[i] * 1 - 1],
										{quantity: cart[newCartKey[i]]});
			storeTitle.push(newBook.title)
			book.push(newBook)
		}
	}
	return {
		book,
		name,
		storeTitle,
	}
}

