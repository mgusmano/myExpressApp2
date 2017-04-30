module.exports = function(db, util) {
	var record = 'Action'
	var table = 'Actions'

	var ddl = 
`CREATE TABLE ${table} (
	id UUID NOT NULL PRIMARY KEY,
	type VARCHAR(255) NOT NULL,
	subject VARCHAR(255) NOT NULL,
	recipient_id UUID,
	person_id UUID
		REFERENCES People (id)
		ON DELETE SET NULL ON UPDATE CASCADE
)`

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
				type: 'skype',
				subject: 'subject'
			}

			return body;
		}
	};
	return Model
}
