console.log('bulk')
var fs = require('fs')
var util = require('./sqlite/util')

var db = util.initDB()

var f = `./data/People.json`
var people = JSON.parse(fs.readFileSync(f, 'utf8'));
db.serialize(function() {

		var sql = ''
		sql = `DELETE FROM People;`
		db.run(sql, function(err) {
			if (err != null) { console.log(err) }
//			else { console.log(this.sql + ' (id:' + this.lastID + ')') }
		});
		sql = `DELETE FROM Actions;`
		db.run(sql, function(err) {
			if (err != null) { console.log(err) }
//			else { console.log(this.sql + ' (id:' + this.lastID + ')') }
		});


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

		var f = util.getInsertFields(person)
		var v = util.getValueFields(person)
		var table = 'People'
		var sql = `INSERT INTO ${table} (${f}) VALUES(${v});`
		db.run(sql, function(err) {
			if (err != null) {
				console.log(err)
			}
			// else {
			// 	console.log(this.sql + ' (id:' + this.lastID + ')')
			// }
		});

		for (let action of actions) {

			action.person_id = person.id
			delete action.created;

			var f = util.getInsertFields(action)
			var v = util.getValueFields(action)
			var table = 'Actions'
			var sql = `INSERT INTO ${table} (${f}) VALUES(${v});`
			db.run(sql, function(err) {
				if (err != null) {
					console.log(err)
				}
				// else {
				// 	console.log(this.sql + ' (id:' + this.lastID + ')')
				// }
			});




		}
	}
})