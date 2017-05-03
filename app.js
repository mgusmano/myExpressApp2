var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser');
var path = require('path');
var app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

var which = 'sequelize'
//var which = 'sqlite'

var util = require('./' + which + '/util')
	
var db = util.initDB()
var models = util.initModels(db, app)
util.reset(db, models)

var officeApi = require('./' + which + '/api')(models.Office, util)
app.use('/Offices', require('./routes')(officeApi))

var organizationApi = require('./' + which + '/api')(models.Organization, util)
app.use('/Organizations', require('./routes')(organizationApi))

var personApi = require('./' + which + '/api')(models.Person, util)
app.use('/People', require('./routes')(personApi))

var actionApi = require('./' + which + '/api')(models.Action, util)
app.use('/Actions', require('./routes')(actionApi))

//if (which == 'sqlite') {
	var express = require('express');
	var router = express.Router()
	var dbutil = require('./' + which + '/dbutil')
	require('./' + which + '/routes/peopleJSON')(db,app,router,dbutil,models)
//}

module.exports = app;


// var data = require('./mongoose/utils/data.js')
// var Book = require('./mongoose/models/book');
// var bookApi = require('./mongoose/api/book')(Book)
