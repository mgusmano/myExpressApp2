var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser');
var path = require('path');
var app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//http://docs.sequelizejs.com/en/latest/
var which = 'sequelize'
//var which = 'sqlite'

var util = require('./' + which + '/util')
	
var db = util.initDB()
var models = util.initModels(db, app)
//util.reset(db, models)

var officeApi = require('./' + which + '/api')(models.Office, util)
app.use('/Offices', require('./routes')(officeApi))

var organizationApi = require('./' + which + '/api')(models.Organization, util)
app.use('/Organizations', require('./routes')(organizationApi))

var personApi = require('./' + which + '/api')(models.Person, util)
app.use('/People', require('./routes')(personApi))

var actionApi = require('./' + which + '/api')(models.Action, util)
app.use('/Actions', require('./routes')(actionApi))

var express = require('express');
var router = express.Router()
var dbutil = require('./' + which + '/dbutil')
require('./' + which + '/routes/peopleJSON')(db,app,router,dbutil,models)
require('./' + which + '/routes/APNs')(db,app,router,dbutil,models)

//??
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});


module.exports = app;


// var data = require('./mongoose/utils/data.js')
// var Book = require('./mongoose/models/book');
// var bookApi = require('./mongoose/api/book')(Book)
