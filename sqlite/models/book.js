module.exports = function(db, util) {
	var record = 'Book'
	var table = 'Books'
	var ddl = 
	`CREATE TABLE ${table} (
	id UUID NOT NULL PRIMARY KEY,
	title VARCHAR(255),
	author VARCHAR(255),
	genre VARCHAR(255),
	read TINYINT(1) DEFAULT 0
	)`;

	var Model = {
		db: function() {return db},
		record: function() {return record},
		table: function() {return table},
		ddl: function() {return ddl},
		generatebody: function() {
			var faker = require('faker');
			const uuidV4 = require('uuid/v4');
			var body = {
				id: uuidV4(),
				title: faker.company.bs(),
				author: faker.name.firstName() + ' ' + faker.name.lastName(),
				genre: faker.company.bsNoun()
			}

			return body;
		}
	};
	return Model
}
