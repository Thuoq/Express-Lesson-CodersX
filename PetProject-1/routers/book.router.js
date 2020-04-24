const express = require("express");
const router  = express.Router();
const db = require("../db");
const storeBooks = db.get("books").value();
router.get('/',(req,res)=> {
	const books = [].concat(storeBooks)
	res.render("index",{
		books,
	})
})
router.get('/create',(req,res) => {
	res.render("createBook")
})
router.post('/create',(req,res) => {
	let id = storeBooks.length + 1;
	let query = {...req.body}
	const newBook = Object.assign({},query,{id: id})
	db.get("books").push(newBook).write();
	res.redirect("/books");
})
router.get('/:id/delete',(req,res) => {
	const idBook = req.params.id * 1 ; 
	let bookDelete= {};
	for(let i = 0 ; i < storeBooks.length ; i ++) {
		if(idBook === storeBooks[i].id) {
			bookDelete = storeBooks[i]
		} 
	}
	db.get("books").remove(bookDelete).write();
	res.redirect("/books")
})
router.get("/:id/edit",(req,res) => {
	const idBook = req.params.id * 1;
	let book  = storeBooks.filter( el => el.id === idBook)
	res.render("editTitleBook",{
		book: storeBooks
	})
})  
router.post("/:id/edit",(req,res) => {
	let newTitle = req.body.edit;
	let idBook = req.params.id * 1;
	let bookUpdate = {}
	for(let i = 0 ; i < storeBooks.length ; i ++) {
		if(idBook === storeBooks[i].id) {
			bookUpdate = storeBooks[i]
		} 
	}
	db.get('books')
	  .find({ title: bookUpdate.title })
	  .assign({ title: newTitle})
	  .write()
	res.redirect("/")
})
module.exports = router;