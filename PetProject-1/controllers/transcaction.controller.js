const db = require("../db");
const storeTranscaction = db.get("trancations").value();
const storeBooks = db.get("books").value();
const storeUsers = db.get("users").value();

exports.indexTrancation  = (req,res) => {
	const trancations = [].concat(storeTranscaction);
	res.render("trancations/trancation",{
		trancations,
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
	const {user,book} = {...req.body};
	const userTrancations = takeInforTrancation(null,user);
	const bookTrancations =  takeInforTrancation(book,null)
	const idTranscation = storeTranscaction.length + 1;
	const newTrancation = Object.assign({},{idTranscation: idTranscation},bookTrancations,userTrancations);
	db.get("trancations").push(newTrancation).write();
	res.redirect("/");

}
