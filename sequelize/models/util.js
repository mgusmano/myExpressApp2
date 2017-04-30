var path = require("path");
var Sequelize = require("sequelize");
module.exports = {

	initDB: function() {
		var env = process.env.NODE_ENV || "development";
		var config = require(path.join(__dirname, '../', '../', 'config.json')).database;
		var sequelize = new Sequelize(config.database, config.username, config.password, config);
		console.log('using ' + config.dialect)
		return sequelize
	},

	initModels: function(sequelize) {
		var db = {};
		var fs = require("fs");

		fs.readdirSync(__dirname)
			.filter(function(file) {
				return (file.indexOf(".") !== 0) && (file !== "index.js") && (file !== "util.js");
			})
			.forEach(function(file) {
				var model = sequelize.import(path.join(__dirname, file));
				db[model.name] = model;
			});

		Object.keys(db).forEach(function(modelName) {
			if ("associate" in db[modelName]) {
				db[modelName].associate(db);
			}
		});

		db.sequelize = sequelize;
		db.Sequelize = Sequelize;

		return db
	},

	reset: function(sequelize, models) {
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