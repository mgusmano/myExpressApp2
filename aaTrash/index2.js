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
