var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser');

var app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require('mongoose')
//var db = mongoose.connect('mongodb://localhost/bookAPI')
var db = mongoose.connect('mongodb://mgusmano:Gusheandy1@cluster0-shard-00-00-gxxh8.mongodb.net:27017,cluster0-shard-00-01-gxxh8.mongodb.net:27017,cluster0-shard-00-02-gxxh8.mongodb.net:27017/bookAPI?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin')
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.on('connected', function () {console.log('Mongoose connection open');});

app.use('/Books', require('./routes/book/bookRoutes'))
app.use('/SortPlans', require('./routes/sortplan/sortplanRoutes'))
app.use('/Users', require('./routes/user/userRoutes'))

app.get('/notes', function(req, res) {
	res.json({notes: "This is your notebook. Edit this to start saving your notes!"})
})
module.exports = app;








// var index = require('./routes/index');
// var users = require('./routes/users');


//var path = require('path')
//var favicon = require('serve-favicon');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');

// var sortPlans = require('./routes/sortPlans');
// app.use('/sortPlans', sortPlans);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found at all mjg');
//   err.status = 404;
//   next(err);
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });






// db.listCollections().toArray(function(err, collInfos) {
// 	console.log(collinfos)
// });


// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json({ type: 'application/json' }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
