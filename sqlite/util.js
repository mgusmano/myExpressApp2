//https://github.com/mapbox/node-sqlite3/wiki/API
var path = require("path")
var Sqlite3 = require('sqlite3')
var fs = require('fs')
//var db

module.exports = {

	initDB: function() {
		var config = require(path.join(__dirname, './', 'config.json')).database;
		var sqlite3 = Sqlite3.verbose();
		db = new sqlite3.Database(config.storage)
		console.log('using ' + config.storage)
		return db
	},

	initModels: function(db,app) {
		var fs = require("fs");
		var models = {}
		var modelPath = path.join(__dirname, './', 'models')
		fs.readdirSync(modelPath)
			.forEach(function(file) {
				//console.log(file)
				var model = file.substring(0, file.length-3);
				model = model.charAt(0).toUpperCase() + model.slice(1);
				//var model = sequelize.import(path.join(modelPath, file));
				totalModelPath = modelPath + '/' + model
				var modelFile = require(totalModelPath)
				models[model] = modelFile(db,app);
				//models[model] = modelFile;
			});
		// Object.keys(models).forEach(function(modelName) {
		// 	if ("associate" in models[modelName]) {
		// 		models[modelName].associate(models);
		// 	}
		// });
//		models.sequelize = sequelize;
			models.db = db
		return models
	},



	reset: function(db) {
		console.info('Populating database with example data...');
		var rootThis = this
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
				var f = rootThis.getInsertFields(office)
				var v = rootThis.getValueFields(office)
				var sql = `INSERT INTO ${table} (${f}) VALUES(${v});`
				db.run(sql, function(err) { if (err != null) { console.log(err);console.log(this.sql); } });
			}

			for (let organization of organizations) {
				var table = 'Organizations'
				var f = rootThis.getInsertFields(organization)
				var v = rootThis.getValueFields(organization)
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
//				delete person.birthday;
				delete person.started;
				delete person.ended;

				var table = 'People'
				var f = rootThis.getInsertFields(person)
				var v = rootThis.getValueFields(person)
				var sql = `INSERT INTO ${table} (${f}) VALUES(${v});`
				db.run(sql, function(err) { if (err != null) { console.log(err);console.log(this.sql); } });

				for (let action of actions) {
					action.person_id = person.id
					delete action.created;

					var table = 'Actions'
					var f = rootThis.getInsertFields(action)
					var v = rootThis.getValueFields(action)
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
			}).then(function() {
				console.info('Populating database: DONE');
			})

		})
	},

	getOne: function(res, db, id, callback, table) {
		var rootThis = this
		var callee = arguments.callee.name
		var sql = `SELECT * FROM ${table} where id = '${id}';`;console.log(sql)
		db.get(sql, function(err, row) { rootThis.completedwithdata(this, err, res, callee, callback, row) });
	},

	getSetFields: function(data){
		return fields = Object.keys(data).map(function(k){
			var sep = ""; if (typeof data[k] == "string") {sep = "'"}
			if (typeof data[k] == "boolean") {
				if(data[k]==false) {data[k] = 0}
				if(data[k]==true) {data[k] = 1}
			}
			return k + '=' + sep + data[k] + sep
		}).join(",");
	},
	getInsertFields: function(data){
		return fields = Object.keys(data).map(function(k){
			return k
		}).join(",");
	},
	getQuestionMarks: function(data){
		return fields = Object.keys(data).map(function(k){
			return '?'
		}).join(",");
	},
	getValueFields: function(data){
		return fields = Object.keys(data).map(function(k){
			//var varType = typeof data[k]
			var val = data[k]
			var sep = ''; if (typeof val == "string") {sep = '"'}
			if (typeof val == "object") {sep = "'"}
			//console.log(val)
			if(typeof data[k] == "object") {val = JSON.stringify(data[k])}
			//var val2 = val.replace(/"/g, "'")
			//console.log(val2)
			val2 = val
//			var sep = ''; if (varType == "string") {sep = '"'}
			return sep + val2 + sep
		}).join(",");
	},

	completedwithdata: (caller, err, res, callee, callback, rows) => {
		if (err) {
			res.status(500).send({
				result: 'error',
				action: callee,
				message: err.toString()
			})
		}
		else if (rows == undefined) {
			res.status(500).send({
				result: 'error',
				action: callee,
				sql: caller.sql,
				message: 'no rows returned'
			})
		}
		else{ 
			callback({
				result: 'success',
				action: callee,
				sql: caller.sql,
				lastID: caller.lastID,
				changes: caller.changes,
				data: rows
			})
		}
	},

	completed: (caller, err, res, rootThis, callback) => {
		if (err) {
			res.status(500).send({
				result: 'error',
				action: rootThis.callee,
				message: err.toString()
			})
		}
		else {
			callback({
				result: 'success',
				action: rootThis.callee,
				sql: caller.sql,
				lastID: caller.lastID,
				changes: caller.changes
			})
		}
	}


}

