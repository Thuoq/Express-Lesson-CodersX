const db = require("../db");
const storeBooks = db.get("books").value();
const storeUsers = db.get("users").value();
const takeInforTrancation = (book,user) =>  {
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
module.exports = takeInforTrancation;