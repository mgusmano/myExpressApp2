module.exports = function(db, util) {
	var faker = require('faker');
	const uuidV4 = require('uuid/v4');
	//select p.lastname, a.* from People p, Actions a where p.id = a.person_id

		// birthday DATE NOT NULL, 
		// started DATE, 
		// ended DATE, 
		// office_id UUID 
		// 	REFERENCES Offices (id) 
		// 	ON DELETE SET NULL 
		// 	ON UPDATE CASCADE, 
		// organization_id UUID 
		// 	REFERENCES Organizations (id) 
		// 	ON DELETE SET NULL 
		// 	ON UPDATE CASCADE, 
		// UNIQUE (email), 
		// UNIQUE (username)

	var Model = {
		db: db,
		record: 'Person',
		table: 'People',
	ddl:
	`CREATE TABLE People (
		id UUID NOT NULL PRIMARY KEY,
		email VARCHAR(255) NOT NULL, 
		username VARCHAR(255) NOT NULL, 
		password VARCHAR(255) NOT NULL, 
		firstname VARCHAR(255) NOT NULL, 
		lastname VARCHAR(255) NOT NULL, 
		title VARCHAR(255), 
		phone VARCHAR(255), 
		extension VARCHAR(255), 
		skype VARCHAR(255), 
		linkedin VARCHAR(255), 
		picture VARCHAR(255),
		office_id UUID 
			REFERENCES Offices (id) 
			ON DELETE SET NULL 
			ON UPDATE CASCADE, 
		organization_id UUID 
			REFERENCES Organizations (id) 
			ON DELETE SET NULL 
			ON UPDATE CASCADE 
	)`,
		generatebody: function() {
			return body = {
				id: uuidV4(),
				email: faker.internet.email(),
				username: faker.internet.userName(),
				password: "password",
				firstname: faker.name.firstName(),
				lastname: faker.name.lastName(),
				birthday: "1999-05-06"
			}
		}
	};
	return Model
}
