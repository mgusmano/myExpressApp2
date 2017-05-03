module.exports = function(db, app) {
	var faker = require('faker');
	const uuidV4 = require('uuid/v4');
	var express = require('express');
	var router = express.Router()

	var dbutil = require('../dbutil');
	app.get('/PeopleJSON2/:Id', function (req, res) {
		var id = req.params.Id
		sqlPerson = `SELECT * FROM People where id = '${id}';`
		sqlOffice = `SELECT off.* FROM Offices off, People ppl where ppl.id = '${id}' and ppl.office_id = off.id;`
		sqlOrganization = `SELECT org.* FROM Organizations org, People ppl where ppl.id = '${id}' and ppl.organization_id = org.id;`
		sqlActions = `select act.* from People ppl, Actions act where ppl.id = act.person_id and ppl.id = '${id}'` // and r.id = p.recipient_id';`
		sqlManage = `select * from Organizations where manager_id = '${id}'`
		Promise.all([
			dbutil.promiseItGet('Person',sqlPerson,db), 
			dbutil.promiseItGet('Office',sqlOffice,db), 
			dbutil.promiseItGet('Organization',sqlOrganization,db), 
			dbutil.promiseItAll('Actions',sqlActions,db),
			dbutil.promiseItGet('Manage',sqlManage,db) 
		]).then(values => {
			if(dbutil.promiseErrors(values) != 0) { return } 
			var person = values[0]
			person.office = values[1]
			person.organization = values[2]
			person.actions = values[3],
			person.manage = values[4]
			res.json({result: 'success', data: person})
		})
	})

	app.get('/PeopleAll', function (req, res) {
		var sql = `
		SELECT 
		ppl.id as person_id,
		ppl.firstname as person_firstname,
		ppl.lastname as person_lastname,
		ppl.picture as person_picture,
		ppl.email as person_email,
		ppl.phone as person_phone,
		off.id as office_id,
		off.name as office_name,
		off.city as office_city,
		off.country as office_country,
		org.id as organization_id,
		org.name as organization_name,
		mgr.id as manager_id,
		mgr.firstname as manager_firstname,
		mgr.lastname as manager_lastname,
		mgr.lastname as manager_url
		FROM
		People        ppl,
		People        mgr,
		Offices       off,
		Organizations org
		WHERE ppl.office_id = off.id
		AND   ppl.organization_id = org.id
		AND   org.manager_id = mgr.id
		`
		db.all(sql, function(err, row) { 
			res.json(row)
		});
	})



	app.get('/Test/:Id', function (req, res) {

var sql2 = `SELECT * FROM Actions where person_id = '${req.params.Id}'`


		var sql = `
		SELECT
		*, count(SELECT id FROM Actions where person_id = '${req.params.Id}') as a
		FROM People
		WHERE id = '${req.params.Id}'
		`
		db.all(sql, function(err, rows) {if(err){res.send(err)} else{res.json(rows)}});
	})



	app.get('/People/:Id/Actions_list', function (req, res) {
		var sql = `select a.id from People p, Actions a where p.id = a.person_id and p.id = '${req.params.Id}'`;
		db.all(sql, function(err, rows) { 
			res.json(rows)
		});
	})

	app.get('/PeopleAll/:Id', function (req, res) {
		var sql = `
		SELECT 
		ppl.*,
		ppl.id as person_id,
		ppl.firstname as person_firstname,
		ppl.lastname as person_lastname,
		ppl.picture as person_picture,
		off.id as office_id,
		off.name as office_name,
		org.id as organization_id,
		org.name as organization_name,
		mgr.id as manager_id,
		mgr.firstname as manager_firstname,
		mgr.lastname as manager_lastname
		FROM
		People        ppl,
		People        mgr,
		Offices       off,
		Organizations org
		WHERE ppl.id = '${req.params.Id}'
		AND   ppl.office_id = off.id
		AND   ppl.organization_id = org.id
		AND   org.manager_id = mgr.id
		`
		db.all(sql, function(err, row) { 
			res.json(row)
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








//db.serialize(function() {


		// sqlManage = `select * from Organizations where manager_id = '${id}'`
		// let getManage=promiseIt('Manage',sqlManage,db)


// 		let getOrganization = new Promise((resolve, reject)=>db.get(sqlOrganization,function(err,resp) {
// 			if (err) {resolve({result: 'error', sql: sqlOrganization, action: 'getOrganization', message: err.toString()});return;} 
// 			if (resp == undefined) {resolve({});return}

// 			var organization = resp

// 			sqlManager = `select p.* from People p where p.id = '${organization.manager_id}';`
// 			let getManager = new Promise((resolve, reject)=>db.get(sqlManager,function(err,resp){
// 				if (err) {resolve({result: 'error', sql: sqlManager, action: 'getManager', message: err.toString()});return}
// 				resolve(resp)
// 			}))

// 			sqlManagees = `select p.* from People p where p.organization_id = '${organization.id}';`
// 			let getManagees = new Promise((resolve, reject)=>db.all(sqlManagees,function(err,resp){
// 				if (err) {resolve({result: 'error', sql: sqlManagees, action: 'getManagees', message: err.toString()});return}
// 				resolve(resp)
// 			}))

// 			Promise.all([getManager,getManagees]).then(values => {
// 				var error = []
// 				for (let value of values) {
// 					if(value == undefined) {}
// 					else {
// 						if(value.result == 'error') {error.num = 0;error.push(value)}
// 					}
// 				}
// 				if(error.length != 0) {
// 					res.json({
// 						result: 'error',
// 						errors: error
// 					})
// 				}
// 				else {
// 					var manager = values[0]
// 					organization.manager = manager
// 					var managees = values[1]
// 					organization.managees = managees
// 					resolve(organization)
// 				}
// 			})
// 		}))
// //??


		// //this could be more than one...
		// sqlManage = `select * from Organizations where manager_id = '${id}'`
		// let getManage = new Promise((resolve, reject)=>db.get(sqlManage,function(err,resp) {
		// 	if (err) {resolve({result: 'error', sql: this.sql, action: 'getManage', message: err.toString()})} 
		// 	else {
		// 		if (resp == undefined) {resolve({})}
		// 		else {
		// 			var manage = resp
		// 			sqlManagees = `select p.* from People p where organization_id = '${resp.id}';`
		// 			db.all(sqlManagees,function(err,resp){
		// 				if (err) {resolve({result: 'error',sql: this.sql,action: 'getManagees',message: err.toString()})}
		// 				else {
		// 					manage.managed = resp
		// 					resolve(manage)
		// 				} 
		// 			})
		// 		}
		// 	}
		// }))




// function cb(err, resp, callee, sql) {
// 	if(resp == undefined) {
// 		return {}
// 		// return({
// 		// 	result: 'error',
// 		// 	action: callee,
// 		// 	sql: sql,
// 		// 	message: 'no data returned'
// 		// })
// 	}
// 	else if (err) {
// 		return({
// 			result: 'error',
// 			action: callee,
// 			sql: sql,
// 			message: err.toString()
// 		})
// 	} 
// 	else {
// 		return resp
// 	} 
// }
// function promiseItGet(entity,sql,db) {
// 		return new Promise((resolve, reject)=>db.get(sql,function(err,resp) {
// 			resolve(cb(err,resp,entity,sql))}
// 		))
// }
// function promiseItAll(entity,sql,db) {
// 		return new Promise((resolve, reject)=>db.all(sql,function(err,resp) {
// 			resolve(cb(err,resp,entity,sql))}
// 		))
// }
// function promiseErrors(values) {
// 	var error = []
// 	for (let value of values) {
// 		if(value == undefined) {}
// 		else {
// 			if(value.result == 'error') {error.push(value)}
// 		}
// 	}
// 	if(error.length != 0) {
// 		res.json({result: 'error',errors: error})
// 		return 1
// 	}
// 	else {
// 		return 0
// 	}
// }



		// Promise.all([getPerson, getOffice, getOrganization, getActions, getManage]).then(values => {
		// 	var error = []
		// 	for (let value of values) {
		// 		if(value == undefined) {}
		// 		else {
		// 			if(value.result == 'error') {error.num = 0;error.push(value)}
		// 		}
		// 	}
		// 	if(error.length != 0) {
		// 		res.json({
		// 			result: 'error',
		// 			errors: error
		// 		})
		// 	}
		// 	else {
		// 		var person = values[0]
		// 		person.office = values[1]
		// 		person.organization = values[2]
		// 		person.actions = values[3]
		// 		person.manage = values[4]
		// 		res.json({
		// 			result: 'success',
		// 			data: person
		// 		})
		// 	}
		// })





//	})




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
