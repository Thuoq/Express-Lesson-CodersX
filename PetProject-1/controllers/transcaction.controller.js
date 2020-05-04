const db = require("../db");
const storeTranscaction = db.get("trancations").value();
const storeBooks = db.get("books").value();
const storeUsers = db.get("users").value();

exports.indexTrancation  = (req,res) => {
	const trancations = storeTranscaction;
	const [userAdmin]  = db.get("users").filter({idUser: req.signedCookies.userId * 1}).value();
	let {avatar} = db.get("users").find({idUser: parseInt(req.signedCookies.userId)}).value();
	if(!userAdmin.isAdmin) {
		let trancationUser = db.get("trancations").filter({name:userAdmin.name}).value()
		res.render("trancations/trancation",{
			trancations: trancationUser,
			srcImg: avatar
		})
		return;
	}
	res.render("trancations/trancation",{
		trancations,
		srcImg: avatar
	})
	
}

exports.trancationCreate = (req,res) => {
	res.render("trancations/createTrancation",{
		users:storeUsers,
		books:storeBooks
	})
}

function takeInforTrancation(book,user) {
	let newInforTrancation = {};
	if(book) {
		for(let i = 0 ; i < storeBooks.length ; i++) {
			if(book === storeBooks[i].title) {
				newInforTrancation = storeBooks[i]
			}
		}
		return newInforTrancation;	
	}else{
		for(let i = 0 ; i < storeUsers.length ; i ++ ) {
			if(user === storeUsers[i].name) {
				newInforTrancation = storeUsers[i]
			}
		}
		return newInforTrancation
	}
}

exports.trancationCreatePost = (req,res) => {
	let {user,book} = {...req.body};
	let userTrancations = takeInforTrancation(null,user);
	let bookTrancations =  takeInforTrancation(book,null)
	let idTranscation = storeTranscaction.length + 1;
	let newTrancation = Object.assign({},{idTranscation: idTranscation},bookTrancations,userTrancations);
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