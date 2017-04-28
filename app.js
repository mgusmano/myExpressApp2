var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser');

var app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// var data = require('./utils/mongoose/data.js')
// var Book = require('./models/mongoose/book');
// var bookApi = require('./api/mongoose/book')(Book)

var data = require('./utils/sequelize/data.js')
var Book = require('./models/sequelize').Book;
var bookApi = require('./api/sequelize/book')(Book)

//data.reset()

// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('./sqlite.db');
// db.all("SELECT title, author FROM Books", function(err, rows) {
// 	rows.forEach(function (row) {
// 			console.log(row.title, row.author);
// 	})
// });
// db.close();

app.use('/Books', require('./routes/bookRoutes')(bookApi))
app.use('/SortPlans', require('./routes/sortplanRoutes'))
app.use('/Users', require('./routes/userRoutes'))

module.exports = app;
