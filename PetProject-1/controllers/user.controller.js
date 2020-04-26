const db = require("../db");
const storeUsers = db.get("users").value();
exports.indexUser = (req,res) => {
	let currentUsers = [].concat(storeUsers)
	res.render("users/users",{
		users : currentUsers
	})
}

exports.userCreate =(req,res) => {
	res.render("users/createUser")
}

exports.userCreatePost = (req,res) => {
	let newIdUser = storeUsers.length +1;
	let query = {...req.body};
	const newUser = Object.assign({},{idUser: newIdUser},query);
	db.get("users").push(newUser).write();
	res.redirect("/users")
}


exports.userEdit = (req,res) => {
	const idUser = req.params.id * 1;
	let user  = storeUsers.filter( el => el.idUser === idUser)
	res.render("users/editNameUser",{
		users: user
	})
}

exports.userEditPost = (req,res) => {
	let newUserName = req.body.edit;
	let idUser = req.params.id * 1;
	let bookUpdate = {}
	for(let i = 0 ; i < storeUsers.length ; i ++) {
		if(idUser === storeUsers[i].idUser) {
			bookUpdate = storeUsers[i]
		} 
	}  
	
	db.get('users')
	  .find({ name: bookUpdate.name })
	  .assign({ name: newUserName})
	  .write()
	res.redirect("/users")
}
exports.userDelete = (req,res) => {
	const idUser = req.params.id * 1 ; 
	db.get("users").remove({idUser: idUser}).write();
	res.redirect("/")
}