const express = require("express");
const router  = express.Router();
const db = require("../db");
const storeUsers = db.get("users").value();
router.get("/",(req,res) => {
	let currentUsers = [].concat(storeUsers)
	res.render("users/users",{
		users : currentUsers
	})
})
router.get("/create",(req,res) => {
	res.render("users/createUser")
}) 
router.post("/create",(req,res) => {
	let newIdUser = storeUsers.length +1;
	let query = {...req.body}
	const newUser = Object.assign({},{idUser: newIdUser},query);
	db.get("users").push(newUser).write();
	res.redirect("/users")
})
router.get("/:id/edit",(req,res) => {
	const idUser = req.params.id * 1;
	let user  = storeUsers.filter( el => el.idUser === idUser)
	res.render("users/editNameUser",{
		users: user
	})
})
router.post("/:id/edit",(req,res) => {
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
})
router.get('/:id/delete',(req,res) => {
	const idUser = req.params.id * 1 ; 
	let userDelete= {};
	for(let i = 0 ; i < storeUsers.length ; i ++) {
		if(idUser === storeUsers[i].idUser) {
			bookDelete = storeUsers[i]
		} 
	}
	db.get("users").remove(userDelete).write();
	res.redirect("/users")
})
module.exports = router