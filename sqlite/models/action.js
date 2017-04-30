module.exports = function(db, util) {
	var faker = require('faker');
	const uuidV4 = require('uuid/v4');
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
		}
	};
	return Model
}
