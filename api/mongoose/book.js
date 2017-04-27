module.exports = function(Book) {
	//var Book = require('../../models/sequelize').Book;
	var Service = {
		get: function(query, callback) {
			Book.find(query, function(err,bookCollection) {
				callback(err,bookCollection)
			})
		}
	};
	return Service
}


// "use strict";
// var Book = require('../../models/Mongoose/book')

// var Service = {
// 	get: function(query, callback) {
// 		Book.find(query, function(err,bookCollection) {
// 			callback(err,bookCollection)
// 		})
// 	},
// };

// module.exports = Service;