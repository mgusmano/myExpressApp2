//https://github.com/mapbox/node-sqlite3/wiki/API
module.exports = function(model, util) {
	//var util = require('./util')
	var db = model.db
	var table = model.table
	var ddl = model.ddl
	
	var Model = {
		droptable: function(res, callback) {
			rootThis = this; var callee = arguments.callee.name
			var sql = `DROP TABLE ${table};`;console.log(sql)
			db.run(sql, function(err) { util.completed(this, err, res, callee, callback) });
		},
		createtable: function(res, callback) {
			console.log(ddl)
			rootThis = this; var callee = arguments.callee.name
			var sql = ddl.replace(/(\r\n|\n|\r)/gm,"");console.log(ddl)
			db.get(sql, function(err) { util.completed(this, err, res, rootThis, callback) });
		},
		generatedata: function(res, callback) {
			var rootThis = this; var callee = arguments.callee.name
			var _ = require("lodash");
			var num = 100;

var error = 'no'

db.serialize(function() {

			var rows = _.times(num, function(n) {
				//https://www.npmjs.com/package/faker
				//http://marak.github.io/faker.js/
				var body = model.generatebody()
				var f = util.getInsertFields(body)
				var v = util.getValueFields(body)
				var sql = `INSERT INTO ${table}(${f}) VALUES(${v});`
				console.log(sql)
				db.run(sql, function(err) {
					//need to fix async issues
					if (err) {
						if (error == 'no') {
							res.status(500).send({
								result: 'error',
								action: callee,
								sql: this.sql,
								message: err.toString()
							})
						}
						error = 'yes'
					}
					else {
						console.log(this.sql + ' (id:' + this.lastID + ')')
					}
				});
			})

});
			callback({message: 'generatedata'})
		},
		deleteall: function(res, callback) {
			var rootThis = this; var callee = arguments.callee.name
			var sql = `DELETE FROM ${table};`;console.log(sql)
			db.get(sql, function(err) { util.completed(this, err, res, callee, callback) });
		},
		get: function(res, callback) {
			var rootThis = this; var callee = arguments.callee.name
			var sql = `SELECT * FROM ${table}`;console.log(sql)
			db.all(sql, function(err, rows) { util.completedwithdata(this, err, res, callee, callback, rows) });
		},
		post: function(res, body, callback) {
			var rootThis = this; var callee = arguments.callee.name
			var f = util.getInsertFields(body)
			var v = util.getValueFields(body)
			var sql = `INSERT INTO ${table}(${f}) VALUES(${v});`;console.log(sql)
			db.run(sql, function(err) {
				if (err) {
					res.status(500).send({
						result: 'error',
						action: callee,
						sql: this.sql,
						message: err.toString()
					})
				}
				else { util.getOne(res, db, this.lastID, callback, table) }
			});
		},
		getById: function(res, id, callback) {
			util.getOne(res, db, id, callback, table)
		},
		delete: function(res, id, callback) {
			var rootThis = this; var callee = arguments.callee.name
			var sql = `DELETE FROM ${table} where id = '${id}';`;console.log(sql)
			db.get(sql, function(err) { util.completed(this, err, res, callee, callback) });
		},
		putpatch: function(res, id, newData, callback) {
			var rootThis = this; var callee = arguments.callee.name
			var fields = util.getSetFields(newData)
			var sql = `UPDATE ${table} SET ${fields} WHERE id = '${id}';`;console.log(sql)
			db.run(sql, function(err) {
				if (err) {
					res.status(500).send({
						result: 'error',
						action: callee,
						sql: this.sql,
						message: err.toString()
					})
				}
				else { util.getOne(res, db, id, callback, table) }
			});
		},


// db.serialize(function() {
//   db.run("CREATE TABLE lorem (info TEXT)");

//   var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//   for (var i = 0; i < 10; i++) {
//       stmt.run("Ipsum " + i);
//   }
//   stmt.finalize();

//   db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
//       console.log(row.id + ": " + row.info);
//   });
// });


//				title: chance.sentence({words: 4}),

// 		init: function(res, callback) {
// 			var me = this
// 			var fs = require('fs');
// 			var f = `./data/sequelize/${table}.json`
// 			console.log(' ')
// 			var obj = JSON.parse(fs.readFileSync(f, 'utf8'));

// // 			db.serialize(function() {
// // 				db.run(`DROP TABLE IF EXISTS ${table};`);
				
// // 				var sql = 
// // 					`CREATE TABLE if not exists ${table} (
// // id integer PRIMARY KEY AUTOINCREMENT,
// // title VARCHAR(255),
// // author VARCHAR(255),
// // genre VARCHAR(255),
// // read TINYINT(1) DEFAULT 0
// // )`;console.log(sql)
// // 				db.run(sql);

// 				var f = me.getInsertFields(obj[0])
// 				var v = me.getValueFields(obj[0])
// 				for (var i = 0; i < obj.length-1; i++) {
// 					var v = me.getValueFields(obj[i])
//  					db.run(`INSERT INTO ${table}(${f}) VALUES(${v});`);
// 				}
// 				db.all(`SELECT * FROM ${table}`, function(err, rows) {
// 					console.log(rows)
// 					callback(rows) 
// 				});
// 			});


//		},
	};
	return Model
}
