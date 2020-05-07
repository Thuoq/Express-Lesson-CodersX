const db = require("../db");
const storeBooks = db.get("books").value();
const getCountItem = require("../utilis/book.utilis");

exports.indexBook = (req,res)=> {
	let {userId} = req.signedCookies;
	let inFormationUser = db.get("users").find({idUser: parseInt(userId) }).value();
	/*Panitaion*/
	let page = parseInt(req.query.page) || 1;
	let perPage = 9;
	let start = (page - 1 ) * perPage;
	let end = page*perPage;
	let totalPage = Math.ceil(storeBooks.lenth / perPage)
	let books = storeBooks.slice(start,end);
	let totalItem = getCountItem(req);
	/*********/
	if(inFormationUser){
		res.render("books/books",{
			books,
			page: [page],
			srcImg : inFormationUser.avatar,
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


exports.countItemToCart = (req,res) => {
	let idBook  = req.params.id * 1
	let {sessionId} = req.signedCookies;
	if(!sessionId) {
		res.redirect('/books');
		return
	}

	let count = db.get("sessions")
				  .find({idSession: sessionId * 1})
				  .get('cart.' + idBook,0)
				  .value();
	db.get("sessions")
		.find({idSession: sessionId * 1})
		.set('cart.' + idBook,count + 1)
		.write();
	res.redirect("/books"); 
}

exports.getCheckOutPage = (req,res) => {
	const totalItem = getCountItem(req);
	res.render("checkout/checkout",{
		number : totalItem
	})
}