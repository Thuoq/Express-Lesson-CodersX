const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
	books: String,
	image: String,
	title: String,
	detail: String 
})
const Books = mongoose.model('Books',bookSchema,'books');

module.exports = Books;