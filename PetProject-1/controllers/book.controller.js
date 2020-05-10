const db = require("../db");
const Sessions = require("../models/session.model");
const Books = require("../models/book.model");
const Users = require("../models/user.model");
const storeBooks = db.get("books").value();
const getCountItem = require("../utilis/book.utilis");

exports.indexBook = async (req,res)=> {
	let {userId} = req.signedCookies;
	let storeBooks = await Books.find()
	let inFormationUser = await Users.findOne({_id: userId })
	/*Panitaion*/
	let page = parseInt(req.query.page) || 1;
	let perPage = 9;
	let start = (page - 1 ) * perPage; 
	let end = page * perPage;
	let totalPage = Math.ceil(storeBooks.lenth / perPage)
	let books = storeBooks.slice(start,end);
	let totalItem = await getCountItem(req);
	/*********/
	if(inFormationUser){
		res.render("books/books",{
			books,
			page: [page],
			srcImg : inFormationUser.avatar,
			user  : inFormationUser,
			number : totalItem
		})
	}else{
		res.render("books/books",{
			books,
			page: [page],
			number : totalItem
		})
	}
}

exports.bookCreate = (req,res) => {
	res.render("books/createBook")
}

exports.bookCreatePost = (req,res) => {
	let id = storeBooks.length + 1;
	let query = {...req.body}
	let newBook = Object.assign({},query,{idBook: id})
	db.get("books").push(newBook).write();
	res.redirect("/books");
}

exports.bookDelete = (req,res) => {
	const idBook = req.params.id  ; 
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
	const idBook = req.params.id ;
	let book  = storeBooks.filter( el => el.idBook === idBook)
	res.render("books/editTitleBook",{
		book: storeBooks
	})
}

exports.bookEditPost = (req,res) => {
	let newTitle = req.body.edit;
	let idBook = req.params.id ;
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

exports.countItemToCart = async (req,res) => {
	let idBook  = req.params.id ;
	let {sessionId} = req.signedCookies;
	if(!sessionId) {
		res.redirect('/books');
		return
	}
	let {books,title,image,detail} = await Books.findById(idBook);
	let {cart} = await Sessions.findById(sessionId);
	if(cart.find(el => el.books === books)) {
		 cart.map(el => el.books === books ? el.quantity += 1 : el)
	}else{
		let newBooks =  Object.assign({},{quantity: 1,books,title,image,detail})
		cart.push(newBooks);
	}
	await Sessions.findByIdAndUpdate(sessionId,
		{cart : cart},
		{new: true});
	res.redirect("/books"); 
}

