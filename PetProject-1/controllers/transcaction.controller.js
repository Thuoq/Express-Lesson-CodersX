const db = require("../db");
const getCountItem = require("../utilis/book.utilis");
const storeTranscaction = db.get("trancations").value();
const storeBooks = db.get("books").value();
const storeUsers = db.get("users").value();
const Trancations = require("../models/trancation.model");
const takeInforTrancation = require("../utilis/trancations.utilis");	
const Users = require("../models/user.model");
exports.indexTrancation  = async (req,res) => {
	try{
		const user = await Users.findById(req.signedCookies.userId);
		let totalItem = await getCountItem(req)
		if(!user.isAdmin) {
			let trancationUser = await Trancations.find({name: user.name})
			res.render("trancations/trancation",{
				trancations: trancationUser,
				srcImg: user.avatar,
				number: totalItem
			})
			return;
		}else{
			let trancationUser = await Trancations.find()
			res.render("trancations/trancation",{
				trancations:  trancationUser,
				srcImg: user.avatar,
				number: totalItem

			})
		}
	}catch(err) {
		console.log(err)
	}
	
}

exports.trancationCreate = (req,res) => {
	res.render("trancations/createTrancation",{
		users:storeUsers,
		books:storeBooks
	})
}

exports.trancationCreatePost = (req,res) => {
	let {user,book} = {...req.body};
	let userTrancations = takeInforTrancation(null,user);
	let bookTrancations =  takeInforTrancation(book,null)
	let idTranscation = storeTranscaction.length + 1;
	let newTrancation = Object.assign({},{idTranscation: idTranscation},
									bookTrancations,userTrancations);
	db.get("trancations").push(newTrancation).write();
	res.redirect("/trancation");
}

exports.transcactionCompelete = (req,res) => {
	let idCompelete = req.params.id * 1;
	const trancations = storeTranscaction;
	if(idCompelete > storeTranscaction.length) {
		res.render("trancations/trancation",{
			trancations,
			id: idCompelete
		})	
		return;
	}
	db.get("trancations")
	  .remove({idTranscation: idCompelete})
	  .write();
	res.render("trancations/compeleteTrancation")
}