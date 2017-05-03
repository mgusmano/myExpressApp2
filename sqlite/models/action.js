module.exports = function(db) {
	var faker = require('faker');
	const uuidV4 = require('uuid/v4');
	var express = require('express');
	var router = express.Router()

	// router.route('/:Id/Actions')
	// 	.get(function(req,res) {
	// 			res.json({message: 'Actions'}) 
	// 	})

	var Model = {
		db: db,
		record: 'Action',
		table: 'Actions',
		ddl: 
		`CREATE TABLE Actions (
			id UUID NOT NULL PRIMARY KEY,
			type VARCHAR(255) NOT NULL,
			subject VARCHAR(255) NOT NULL,
			recipient_id UUID,
			person_id UUID
				REFERENCES People (id)
				ON DELETE SET NULL ON UPDATE CASCADE
		)`,
		generatebody: function() {
			return body = {
				id: uuidV4(),
				type: 'skype',
				subject: 'subject'
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
