//https://github.com/mapbox/node-sqlite3/wiki/API
var path = require("path");
var Sequelize = require("sequelize");
var fs = require('fs')
//var db

function pick(items, index) {
	var count = items.length;
	if (index === undefined) {
			index = Math.floor(Math.random() * count);
	}

	return items[index % count];
}

module.exports = {

	initDB: function() {
		//var env = process.env.NODE_ENV || "development";
		var config = require(path.join(__dirname, './', 'config.json')).database;
		var sequelize = new Sequelize(config.database, config.username, config.password, config);
		console.log('using ' + 'sequelize')
		console.log('using ' + config.dialect + ' dialect')
		return sequelize
	},

	initModels: function(sequelize, app) {
		var fs = require("fs");
		var models = {}
		var modelPath = path.join(__dirname, './', 'models')
		fs.readdirSync(modelPath)
			// .filter(function(file) {
			// 	return (file.indexOf(modelPath) !== 0);
			// 	//return (file.indexOf("./models") !== 0) && (file !== "index.js") && (file !== "dbutil.js");
			// })
			.forEach(function(file) {
				var model = sequelize.import(path.join(modelPath, file));
				models[model.name] = model;
			});
		Object.keys(models).forEach(function(modelName) {
			if ("associate" in models[modelName]) {
				models[modelName].associate(models);
			}
		});
		return models
	},

	reset: function(sequelize, models) {
		var Promise = sequelize.Promise;
		console.info('Populating database with example data...');
		return sequelize.transaction(function(t) {
				return sequelize.sync({ force: true, transaction: t }).then(function () {
						return Promise.all([
								models.Action.destroy({ truncate: true, transaction: t }),
								models.Office.destroy({ truncate: true, transaction: t }),
								models.Organization.destroy({ truncate: true, transaction: t }),
								models.Person.destroy({ truncate: true, transaction: t })
						]);
				}).then(function() {
						return Promise.all([
								models.Office.bulkCreate(require('../data/Offices.json'), { transaction: t }),
								models.Organization.bulkCreate(require('../data/Organizations.json'), { transaction: t }),
								Promise.map(require('../data/People.json'), function(data) {
										return models.Person.create(data, { include: [{ model: models.Action, as: 'actions' }], transaction: t });
								})
						])
				});
		}).then(function() {
				return sequelize.transaction(function(t) {
						return Promise.all([
								models.Action.findAll(),
								models.Person.findAll(),
								models.Office.findAll(),
								models.Organization.findAll()
						]).spread(function(actions, persons, offices, organizations) {
								return Promise.all([
										// associate Person (manager) -> Organization
										Promise.map(organizations, function(organization) {
												return organization.setManager(pick(persons), { transaction: t });
										}),
										// associate Person -> Organization
										Promise.map(persons, function(person, index) {
												return person.setOrganization(pick(organizations), { transaction: t });
										}),
										// associate Person -> Office
										Promise.map(persons, function(person, index) {
												return person.setOffice(pick(offices), { transaction: t });
										}),
										// associate Action -> Person (recipient)
										Promise.map(actions, function(action) {
												return action.setRecipient(pick(persons), { transaction: t });
										})
								])
						});
				});
		}).then(function() {
				console.info('Populating database: DONE');
		})
	}

}

