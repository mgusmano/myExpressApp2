module.exports = function(db, util) {
	var faker = require('faker');
	const uuidV4 = require('uuid/v4');
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
		}
	};
	return Model
}
