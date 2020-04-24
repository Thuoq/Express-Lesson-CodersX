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
db.defaults({books: []},{users: []})
  .write()

const storeBooks = db.get("books").value();
const storeUsers = db.get("users").value();
// parse application/json
app.use(bodyParser.json())
/*BOOK*/
app.get("/",(req,res) => {
	res.render("overView")
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
	res.redirect("/books")
})
app.get("/books/:id/edit",(req,res) => {
	const idBook = req.params.id * 1;
	let book  = storeBooks.filter( el => el.id === idBook)
	res.render("editTitleBook",{
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
/*USER*/
app.get("/users",(req,res) => {
	let currentUsers = [].concat(storeUsers)
	res.render("users",{
		users : currentUsers
	})
})
app.get("/users/create",(req,res) => {
	res.render("createUser")
}) 
app.post("/users/create",(req,res) => {
	let newIdUser = storeUsers.length +1;
	let query = {...req.body}
	const newUser = Object.assign({},{id: newIdUser},query);
	db.get("users").push(newUser).write();
	res.redirect("/users")
})
app.get("/users/:id/edit",(req,res) => {
	const idUser = req.params.id * 1;
	let user  = storeUsers.filter( el => el.id === idUser)
	res.render("editNameUser",{
		users: user
	})
})
app.post("/users/:id/edit",(req,res) => {
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
app.get('/users/:id/delete',(req,res) => {
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
app.listen(PORT ,(req,res)=> {
	console.log("Server is Runing on PORT: ",PORT)
})
