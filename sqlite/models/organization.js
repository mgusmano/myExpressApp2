module.exports = function(db) {
	var faker = require('faker');
	const uuidV4 = require('uuid/v4');
	var express = require('express');
	var router = express.Router()

	router.route('/:Id/Actions')
		.get(function(req,res) {
				res.json({message: 'Actions'}) 
		})

	var Model = {
		db: db,
		record: 'Organization',
		table: 'Organizations',
		ddl: 
		`CREATE TABLE Organizations (
			id UUID NOT NULL PRIMARY KEY, 
			name VARCHAR(255) NOT NULL, 
			manager_id UUID, 
			UNIQUE (name)
		)`,
		generatebody: function() {
			return body = {
				id: uuidV4(),
				name: faker.company.companyName()
			}
		},
		// route: function(router) {
		// 	router.route('/:Id/Actions')
		// 		.get(function(req,res) {
		// 				res.json({message: 'Actions'}) 
		// 		})
		// }

	};
	return Model
}
