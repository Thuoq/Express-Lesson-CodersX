const express = require("express");
const router  = express.Router();
const db = require("../db");
const storeUsers = db.get("users").value();
router.get("/",(req,res) => {
	let currentUsers = [].concat(storeUsers)
	res.render("users",{
		users : currentUsers
	})
})
router.get("/create",(req,res) => {
	res.render("createUser")
}) 
router.post("/create",(req,res) => {
	let newIdUser = storeUsers.length +1;
	let query = {...req.body}
	const newUser = Object.assign({},{id: newIdUser},query);
	db.get("users").push(newUser).write();
	res.redirect("/users")
})
router.get("/:id/edit",(req,res) => {
	const idUser = req.params.id * 1;
	let user  = storeUsers.filter( el => el.id === idUser)
	res.render("editNameUser",{
		users: user
	})
})
router.post("/:id/edit",(req,res) => {
	let newUserName = req.body.edit;
	let idUser = req.params.id * 1;
	let bookUpdate = {}
	for(let i = 0 ; i < storeUsers.length ; i ++) {
		if(idUser === storeUsers[i].id) {
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
	let bookDelete= {};
	for(let i = 0 ; i < storeUsers.length ; i ++) {
		if(idUser === storeUsers[i].id) {
			bookDelete = storeUsers[i]
		} 
	}
	db.get("users").remove(bookDelete).write();
	res.redirect("/users")
})
module.exports = router