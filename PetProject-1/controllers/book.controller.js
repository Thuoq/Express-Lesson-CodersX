const db = require("../db");
const storeBooks = db.get("books").value();

exports.indexBook = (req,res)=> {
	const books = storeBooks;
	console.log(req.cookies.userId)
	res.render("books/books",{
		books,
	})
}

exports.bookCreate = (req,res) => {
	res.render("books/createBook")
}

exports.bookCreatePost = (req,res) => {
	let id = storeBooks.length + 1;
	let query = {...req.body}
	const newBook = Object.assign({},query,{idBook: id})
	db.get("books").push(newBook).write();
	res.redirect("/books");
}

exports.bookDelete = (req,res) => {
	const idBook = req.params.id * 1 ; 
	let bookDelete= {};
	for(let i = 0 ; i < storeBooks.length ; i ++) {
		if(idBook === storeBooks[i].idBook) {
			bookDelete = storeBooks[i]
		} 
	}
	db.get("books").remove(bookDelete).write();
	res.redirect("/books")
}

exports.bookEdit = (req,res) => {
	const idBook = req.params.id * 1;
	let book  = storeBooks.filter( el => el.idBook === idBook)
	res.render("books/editTitleBook",{
		book: storeBooks
	})
}

exports.bookEditPost = (req,res) => {
	let newTitle = req.body.edit;
	let idBook = req.params.id * 1;
	let bookUpdate = {}
	for(let i = 0 ; i < storeBooks.length ; i ++) {
		if(idBook === storeBooks[i].idBook) {
			bookUpdate = storeBooks[i]
		} 
	}
	db.get('books')
	  .find({ title: bookUpdate.title })
	  .assign({ title: newTitle})
	  .write()
	res.redirect("/")
}
