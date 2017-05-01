module.exports = function(db, util, app) {
	var faker = require('faker');
	const uuidV4 = require('uuid/v4');
	var express = require('express');
	var router = express.Router()

	app.get('/People/:Id/Actions_list', function (req, res) {
		var sql = `select a.id from People p, Actions a where p.id = a.person_id and p.id = '${req.params.Id}'`;
		db.all(sql, function(err, rows) { 
			res.json(rows)
		});
	})

	app.get('/AllTables', function (req, res) {
		let getOffices = new Promise((resolve, reject) => {db.all(`SELECT * FROM Offices;`, function(err, rows) {if (err) {console.log(err.toString())} else {resolve(rows)} });});
		let getOrganizations = new Promise((resolve, reject) => {db.all(`SELECT * FROM Organizations;`, function(err, rows) {if (err) {console.log(err.toString())} else {resolve(rows)} });});
		let getPeople = new Promise((resolve, reject) => {db.get(`SELECT * FROM People;`, function(err, rows) {if (err) {console.log(err.toString())} else {resolve(rows)} });});
		let getActions = new Promise((resolve, reject) => {db.all(`SELECT * FROM Actions;`, function(err, rows) {if (err) {console.log(err.toString())} else {resolve(rows)} });});
		Promise.all([getOffices,getOrganizations,getPeople, getActions]).then(values => { 
			res.json({
				offices: values[0],
				organizations: values[1],
				people: values[2],
				actions: values[3]
			})
		})
	})

function cb(err, resp) {
	if (err) {
		return({
			result: 'error',
			sql: this.sql,
			message: err.toString()
		})
	} 
	else {
		return resp
	} 
}

	app.get('/People/:Id/All', function (req, res) {
		sql = `SELECT * FROM People where id = '${req.params.Id}';`
		let getPerson = new Promise((resolve, reject)=>db.get(sql,(err,resp)=>resolve(cb(err,resp))))

		sql = `SELECT o.* FROM Offices o, People p where p.id = '${req.params.Id}' and p.office_id = o.id;`
		let getOffice = new Promise((resolve, reject)=>db.get(sql,(err,resp)=>resolve(cb(err,resp))))

		sql = `SELECT o.* FROM Organizations o, People p where p.id = '${req.params.Id}' and p.organization_id = o.id;`
		let getOrganization = new Promise((resolve, reject)=>db.get(sql,(err,resp)=>resolve(cb(err,resp))))

		sql = `select a.* from People p, Actions a where p.id = a.person_id and p.id = '${req.params.Id}';`
		let getActions = new Promise((resolve, reject)=>db.all(sql,(err,resp)=>resolve(cb(err,resp))))

		sql = `select o.* from Organizations o where manager_id = '${req.params.Id}';`
		//this could be more than one...
		let getManage = new Promise((resolve, reject)=>db.get(sql,(err,resp)=>{
			if (err) {resolve({result: 'error',sql: this.sql,message: err.toString()})} 
			else {
				var manage = resp
				sql = `select p.* from People p where organization_id = '${resp.id}';`
				db.all(sql,(err,resp)=>{
					if (err) {resolve({result: 'error',sql: this.sql,message: err.toString()})
					else {
						manage.managed = resp
						resolve(manage)
					} 
				})
			}
		}
	))

		Promise.all([getPerson, getOffice, getOrganization, getActions, getManage]).then(values => {
			var error = []
			for (let value of values) {
				if(value.result == 'error') {error.push(value)}
			}
			if(error.length != 0) {
				res.json({
					result: 'error',
					errors: error
				})
			}
			else {
				var person = values[0]
				person.office = values[1]
				person.organization = values[2]
				person.actions = values[3]
				person.manage = values[4]
				res.json({
					result: 'success',
					data: person
				})
			}
		})
	})


	app.get('/People/:Id/Actions2', function (req, res) {
		var sql = `select a.* from People p, Actions a where p.id = a.person_id and p.id = '${req.params.Id}'`;
		//var sql = `select p.lastname, a.* from People p, Actions a where p.id = a.person_id`;
		db.all(sql, function(err, rows) { 
			res.json(rows)
		});
	})



	// router.route('/mjg/:Id/Actions')
	// 	.get(function(req,res) {
	// 			res.json({message: 'Actions'}) 
	// 	})

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
			birthday DATE NOT NULL, 
			started DATE, 
			ended DATE, 
			office_id UUID 
				REFERENCES Offices (id) 
				ON DELETE SET NULL 
				ON UPDATE CASCADE, 
			organization_id UUID 
				REFERENCES Organizations (id) 
				ON DELETE SET NULL 
				ON UPDATE CASCADE, 
			UNIQUE (email), 
			UNIQUE (username)
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
		},

		// route: function(router) {
		// 	router.route('/:Id/Actions')
		// 		.get(function(req,res) {
		// 				res.json({message: 'Actions'}) 
		// 		})
		// }


	};
	return Model
}
