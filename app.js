var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser');
var app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var util = require('./sqlite/util')
var db = util.initDB()

//util.reset()


var officeModel = require('./sqlite/models/office')(db, util)
var officeApi = require('./sqlite/api')(officeModel, util)
app.use('/Offices', require('./routes')(officeApi,officeModel))

var organizationModel = require('./sqlite/models/organization')(db, util)
var organizationApi = require('./sqlite/api')(organizationModel, util)
app.use('/Organizations', require('./routes')(organizationApi,organizationModel))

var personModel = require('./sqlite/models/person')(db, util, app)
var personApi = require('./sqlite/api')(personModel, util)
app.use('/People', require('./routes')(personApi,personModel))

var actionModel = require('./sqlite/models/action')(db, util, app)
var actionApi = require('./sqlite/api')(actionModel, util)
app.use('/Actions', require('./routes')(actionApi,actionModel))


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

module.exports = app;







// var data = require('./mongoose/utils/data.js')
// var Book = require('./mongoose/models/book');
// var bookApi = require('./mongoose/api/book')(Book)





// var util = require('./sequelize/models/util')
// var db = util.initDB()
// var models = util.initModels(db)

// var bookApi = require('./sequelize/api/book')(models.Book)
// app.use('/Books', require('./routes/bookRoutes')(bookApi))
// app.use('/Utils', require('./routes/utilRoutes')(util, db, models))

//app.use('/SortPlans', require('./routes/sortplanRoutes'))
//app.use('/Users', require('./routes/userRoutes'))
