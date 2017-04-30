var express = require('express');
module.exports = function(util, sequelize, models) {
	var router = express.Router()

	router.route('/Reset')
		.get(function(req,res) {
			util.reset(sequelize, models)
			var t = {message: 'Data Reset'}
			res.json(t) 
		})

	router.route('/Books')
		.get(function(req,res) {
			var sqlite3 = require('sqlite3').verbose();
			var db = new sqlite3.Database('./db/sqlite.db');
			db.all("SELECT * FROM Books", function(err, rows) {
				if (err) {res.status(500).send(err)}
				res.json(rows) 
			});
			db.close();
		})
	
	return router
}
