const db = require("../db");
const getCountItem = require("../utilis/book.utilis");
const {getBookCheckOut} = require("../utilis/checkout.utilis");
exports.indexCheckOutPage = (req,res) => {
	const {userId} = req.signedCookies;
	let {avatar} = db.get("users").find({idUser : userId * 1 }).value();
	const books = getBookCheckOut(req).book;
	const totalItem = getCountItem(req);
	res.render("checkout/checkout",{
		number : totalItem,
		srcImg : avatar,
		books,
	})
}
exports.rentCheckOutSucces = (req,res) => {
	const {name,storeTitle} = getBookCheckOut(req);
	for(let i = 0 ; i < storeTitle.length ; i++) {
		if(db.get("books").find({title: storeTitle[i]})) {
			let book = db.get("books").find({title: storeTitle[i]}).value();
			let newTrancation = Object.assign({}, {name: name}, book);
			db.get("trancations").push(newTrancation).write();
		}
	}
	res.redirect("/trancation")
}