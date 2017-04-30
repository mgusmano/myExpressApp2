console.log('bulk')
var fs = require('fs')
var util = require('./sqlite/util')

var db = util.initDB()

var offices = JSON.parse(fs.readFileSync(`./data/Offices.json`, 'utf8'));
var organizations = JSON.parse(fs.readFileSync(`./data/Organizations.json`, 'utf8'));
var people = JSON.parse(fs.readFileSync(`./data/People.json`, 'utf8'));

db.serialize(function() {

	db.run(`DELETE FROM Offices;`, function(err) {if (err != null) { console.log(err);console.log(this.sql);;console.log(this.sql); } });
	db.run(`DELETE FROM Organizations;`, function(err) {if (err != null) { console.log(err);console.log(this.sql); } });
	db.run(`DELETE FROM People;`, function(err) {if (err != null) { console.log(err);console.log(this.sql); } });
	db.run(`DELETE FROM Actions;`, function(err) {if (err != null) { console.log(err);console.log(this.sql); } });

	for (let office of offices) {
		var table = 'Offices'
		var f = util.getInsertFields(office)
		var v = util.getValueFields(office)
		var sql = `INSERT INTO ${table} (${f}) VALUES(${v});`
		db.run(sql, function(err) { if (err != null) { console.log(err);console.log(this.sql); } });
	}

	for (let organization of organizations) {
		var table = 'Organizations'
		var f = util.getInsertFields(organization)
		var v = util.getValueFields(organization)
		var sql = `INSERT INTO ${table} (${f}) VALUES(${v});`
		db.run(sql, function(err) { if (err != null) { console.log(err);console.log(this.sql); } });
	}

	for (let person of people) {
		var actions = person.actions
		delete person.index; 
		delete person.actions; 
		delete person.gender; 
		delete person.picture_gender;
		delete person.picture_index;
		delete person.birthday;
		delete person.started;
		delete person.ended;

		var table = 'People'
		var f = util.getInsertFields(person)
		var v = util.getValueFields(person)
		var sql = `INSERT INTO ${table} (${f}) VALUES(${v});`
		db.run(sql, function(err) { if (err != null) { console.log(err);console.log(this.sql); } });

		for (let action of actions) {
			action.person_id = person.id
			delete action.created;

			var table = 'Actions'
			var f = util.getInsertFields(action)
			var v = util.getValueFields(action)
			var sql = `INSERT INTO ${table} (${f}) VALUES(${v});`
			db.run(sql, function(err) { if (err != null) { console.log(err);console.log(this.sql); } });
		}
	}

	let getPeople = new Promise((resolve, reject) => {
		var sql = `SELECT id FROM People;`
		db.all(sql, function(err, rows) {
			if (err) { console.log(error.toString()) }
			else { resolve(rows) }
		});
	});

	let getOrganizations = new Promise((resolve, reject) => {
		var sql = `SELECT id FROM Organizations;`
		db.all(sql, function(err, rows) {
			if (err) { console.log(error.toString()) }
			else { resolve(rows) }
		});
	});

	let getOffices = new Promise((resolve, reject) => {
		var sql = `SELECT id FROM Offices;`
		db.all(sql, function(err, rows) {
			if (err) { console.log(error.toString()) }
			else { resolve(rows) }
		});
	});

	function pick(items, index) {
		var count = items.length;
		if (index === undefined) {
				index = Math.floor(Math.random() * count);
		}
		return items[index % count];
	}

	Promise.all([getPeople,getOrganizations,getOffices]).then(values => { 
		var people = values[0]
		var organizations = values[1]
		var offices = values[2]

		var sql = `SELECT * FROM Organizations;`
		db.each(sql, function(err, row) {
			if (err) { console.log(error.toString()) }
			else { 
				var person = pick(people).id
				var sql = `UPDATE Organizations SET manager_id = '${person}' WHERE id = '${row.id}';`
				db.run(sql, function(err) {if (err != null) { console.log(err);console.log(this.sql); } });
			}
		});

		var sql = `SELECT * FROM Actions;`
		db.each(sql, function(err, row) {
			if (err) { console.log(error.toString()) }
			else { 
				var person = pick(people).id
				var sql = `UPDATE Actions SET recipient_id = '${person}' WHERE id = '${row.id}';`
				db.run(sql, function(err) {if (err != null) { console.log(err);console.log(this.sql); } });
			}
		});

		var sql = `SELECT * FROM People;`
		db.each(sql, function(err, row) {
			if (err) { console.log(error.toString()) }
			else { 
				var office = pick(offices).id
				var organization = pick(organizations).id
				var sql = `UPDATE People SET office_id = '${office}', organization_id = '${organization}' WHERE id = '${row.id}';`
				db.run(sql, function(err) {if (err != null) { console.log(err);console.log(this.sql); } });
			}
		});
	});

})