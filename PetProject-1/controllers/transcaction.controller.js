const db = require("../db");
const getCountItem = require("../utilis/book.utilis");
const storeTranscaction = db.get("trancations").value();
const storeBooks = db.get("books").value();
const storeUsers = db.get("users").value();
const takeInforTrancation = require("../utilis/trancations.utilis");	

exports.indexTrancation  = (req,res) => {
	const trancations = storeTranscaction;
	const [userAdmin]  = db.get("users")
						   .filter({idUser: req.signedCookies.userId * 1})
						   .value();
	let {avatar} = db.get("users")
					 	   .find({idUser: parseInt(req.signedCookies.userId)})
					       .value();
	let totalItem = getCountItem(req)
	if(!userAdmin.isAdmin) {
		let trancationUser = db.get("trancations")
							   .filter({name:userAdmin.name})
							   .value()
		res.render("trancations/trancation",{
			trancations: trancationUser,
			srcImg: avatar,
			number: totalItem
		})
		return;
	}
	res.render("trancations/trancation",{
		trancations,
		srcImg: avatar,
	})
	
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