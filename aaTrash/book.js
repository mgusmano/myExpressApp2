module.exports = function(db, util) {
	var faker = require('faker');
	const uuidV4 = require('uuid/v4');
	var Model = {
		db: db,
		record: 'Book',
		table: 'Books',
		ddl: 
		`CREATE TABLE Books (
			id UUID NOT NULL PRIMARY KEY,
			title VARCHAR(255),
			author VARCHAR(255),
			genre VARCHAR(255),
			read TINYINT(1) DEFAULT 0
		)`,
		generatebody: function() {
			return body = {
				id: uuidV4(),
				title: faker.company.bs(),
				author: faker.name.firstName() + ' ' + faker.name.lastName(),
				genre: faker.company.bsNoun()
			}
		}
	};
	return Model
}
