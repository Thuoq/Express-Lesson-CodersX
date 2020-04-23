const express = require("express");
const bodyParser = require("body-parser");
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const app = express();
app.set('view engine', 'pug')
app.set('views', './views')

const PORT = 9000;
const adapter = new FileSync('db.json')
const db = low(adapter)
app.use(bodyParser.urlencoded({ extended: false }))
db.defaults({ books: []})
  .write()

const storeBooks = db.get("books").value()
// parse application/json
app.use(bodyParser.json())
app.get("/",(req,res) => {
	res.send("<a href='/books'>See All Books</a>")
})
app.get('/books',(req,res)=> {
	const books = [].concat(storeBooks)
	res.render("index",{
		books,
	})
})
app.get('/create',(req,res) => {
	res.render("createBook")
})
app.post('/create',(req,res) => {
	let id = storeBooks.length + 1;
	let query = {...req.body}
	const newBook = Object.assign({},query,{id: id})
	db.get("books").push(newBook).write();
	res.redirect("/books");
})
app.get('/books/:id/delete',(req,res) => {
	const idBook = req.params.id * 1 ; 
	let bookDelete= {};
	for(let i = 0 ; i < storeBooks.length ; i ++) {
		if(idBook === storeBooks[i].id) {
			bookDelete = storeBooks[i]
		} 
	}
	db.get("books").remove(bookDelete).write();
	res.redirect("/")
})
app.get("/books/:id/edit",(req,res) => {
	const idBook = req.params.id * 1;
	let book  = storeBooks.filter( el => el.id === idBook)
	res.render("editTitle",{
		book: storeBooks
	})
})  
app.post("/books/:id/edit",(req,res) => {
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
app.listen(PORT ,(req,res)=> {
	console.log("Server is Runing on PORT: ",PORT)
})
