var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookModel = new Schema({
	title: { type: String },
	author: { type: String },
	genre: { type: String },
	read: { type: Boolean, default: false }
})

// var bookModel = new Schema({
// 	title: String,
// 	genre:String,
// 	author:String,
// 	read:Boolean
// });

var Book = mongoose.model('Book', bookModel);
module.exports = Book;