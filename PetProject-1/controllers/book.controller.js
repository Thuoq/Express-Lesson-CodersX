const db = require("../db");
const storeBooks = db.get("books").value();

export.indexBook = (req,res)=> {
	const books = [].concat(storeBooks)
	res.render("books/books",{
		books,
	})
}

export.bookCreate = (req,res) => {
	res.render("books/createBook")
}

export.bookCreatePost = (req,res) => {
	let id = storeBooks.length + 1;
	let query = {...req.body}
	const newBook = Object.assign({},query,{idBook: id})
	db.get("books").push(newBook).write();
	res.redirect("/books");
}

export.bookDelete = (req,res) => {
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

export.bookEdit = (req,res) => {
	const idBook = req.params.id * 1;
	let book  = storeBooks.filter( el => el.idBook === idBook)
	res.render("books/editTitleBook",{
		book: storeBooks
	})
}

export.bookEditPost = (req,res) => {
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
