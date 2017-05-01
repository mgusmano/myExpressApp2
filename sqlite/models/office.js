module.exports = function(db, util) {
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
		record: 'Office',
		table: 'Offices',
		ddl: 
		`CREATE TABLE Offices (
			id UUID NOT NULL PRIMARY KEY, 
			name VARCHAR(255) NOT NULL, 
			address VARCHAR(255) NOT NULL, 
			postcode VARCHAR(255), 
			region VARCHAR(255), 
			city VARCHAR(255) NOT NULL, 
			country VARCHAR(255) NOT NULL, 
			location TEXT NOT NULL, 
			UNIQUE (name)
		)`,
		generatebody: function() {
			//"location":{"latitude":35.28361,"longitude":139.66722}
			var lat = parseFloat(faker.address.latitude())
			var lng = parseFloat(faker.address.longitude())
			var l = `{latitude:${lat},longitude:${lng}}`
			return body = {
				id: uuidV4(),
				name: faker.company.bs(),
				address: faker.address.streetAddress(),
				city: faker.address.city(),
				country: faker.address.country(),
				location: l
			}
		},
		route: function(router) {
			router.route('/:Id/Actions')
				.get(function(req,res) {
						res.json({message: 'Actions'}) 
				})
		}

	};
	return Model
}

//				location: '{latitude:parseFloat(faker.address.latitude()),longitude:parseFloat(faker.address.longitude())}'


