
var models = require("../../models/sequelize");
var sequelize = models.sequelize;
console.log('using sequelize')
module.exports = {
	// create: function() {
	// 	models.User.sync({force: true}).then(function () {
	// 		// Table created
	// 		return models.User.create({
	// 			firstName: 'Joe',
	// 			lastName: 'Gusmano'
	// 		});
	// 	});
	// 	models.Book.sync({force: true}).then(function () {
	// 		// Table created
	// 		return models.Book.create({
	// 			title: 'book title',
	// 			author: 'Joe Gusmano',
	// 			genre: 'Fiction'
	// 		});
	// 	});
	// },
	reset: function() {
		console.info('Populating database with example data...');
		return sequelize.transaction(function(t) {
			return sequelize.sync({ force: true, transaction: t }).then(function () {
				return Promise.all([
					models.User.destroy({ truncate: true, transaction: t }),
					models.Book.destroy({ truncate: true, transaction: t }),
				]);
			}).then(function() {
				return Promise.all([
					models.User.bulkCreate(require('../../data/sequelize/Users.json'), { transaction: t }),
					models.Book.bulkCreate(require('../../data/sequelize/Books.json'), { transaction: t }),
				])
			});
		}).then(function() {
			console.info('Populating database: DONE');
		})
	}



}