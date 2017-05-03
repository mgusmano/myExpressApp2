module.exports = {

		cb: function(err, resp, callee, sql) {
			var me = this
			if(resp == undefined) {
				return {}
				// return({
				// 	result: 'error',
				// 	action: callee,
				// 	sql: sql,
				// 	message: 'no data returned'
				// })
			}
			else if (err) {
				return({
					result: 'error',
					action: callee,
					sql: sql,
					message: err.toString()
				})
			} 
			else {
				return resp
			} 
		},
		promiseItGet: function(entity,sql,db) {
				var me = this
				return new Promise((resolve, reject)=>db.get(sql,function(err,resp) {
					resolve(me.cb(err,resp,entity,sql))}
				))
		},
		promiseItAll: function(entity,sql,db) {
				var me = this
				return new Promise((resolve, reject)=>db.all(sql,function(err,resp) {
					resolve(me.cb(err,resp,entity,sql))}
				))
		},
		promiseErrors: function(values) {
			var me = this
			var error = []
			for (let value of values) {
				if(value == undefined) {}
				else {
					if(value.result == 'error') {error.push(value)}
				}
			}
			if(error.length != 0) {
				res.json({result: 'error',errors: error})
				return 1
			}
			else {
				return 0
			}
		},



	// initDB: function() {
	// 	var config = require(path.join(__dirname, './', 'config.json')).database;
	// 	var sqlite3 = require('sqlite3').verbose();
	// 	console.log('using ' + config.storage)
	// 	db = new sqlite3.Database(config.storage)
	// 	return db
	// },


}