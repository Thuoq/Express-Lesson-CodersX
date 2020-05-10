const db = require("../db");
const getCountItem = require("../utilis/book.utilis");
const {getBookCheckOut} = require("../utilis/checkout.utilis");
const Users = require("../models/user.model");
const Trancations = require("../models/trancation.model");
const Books = require("../models/book.model");
const Sessions = require("../models/session.model");
exports.indexCheckOutPage = async (req,res) => {
	const {userId} = req.signedCookies;
	let {avatar} = await Users.findById(userId);
	const {cart}  = await getBookCheckOut(req);
	const totalItem = await getCountItem(req);
	res.render("checkout/checkout",{
		number : totalItem,
		srcImg : avatar,
		books : cart,
	})	
}
exports.rentCheckOutSucces = async (req,res) => {
	const {userId,sessionId} = req.signedCookies;
	const {cart,storeTitle} = await getBookCheckOut(req);
	const {name,id,isAdmin} = await Users.findById(userId);

	for(let i = 0 ; i < storeTitle.length ; i++) {
		if(Books.findOne({title: storeTitle[i]})) {
			let book = await Books.findOne({title: storeTitle[i]});
			let newTrancation = Object.assign({}, {name: name,
													idUser: userId,
													idBook :book.id, 
													isAdmin,
													quantity: cart[i].quantity,
													title: book.title,
													detail: book.detail
													});
			await Trancations.create(newTrancation);
		}
	}
	await Sessions.findByIdAndUpdate(sessionId,{cart: []},{new: true})
	res.redirect("/trancation")
}