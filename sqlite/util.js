//https://github.com/mapbox/node-sqlite3/wiki/API
var path = require("path");
module.exports = {

	initDB: function() {
		var config = require(path.join(__dirname, './', 'config.json')).database;
		var sqlite3 = require('sqlite3').verbose();
		console.log('using ' + config.storage)
		return new sqlite3.Database(config.storage);
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
			var sep = ''; if (typeof data[k] == "string") {sep = '"'}
			return sep + data[k] + sep
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

