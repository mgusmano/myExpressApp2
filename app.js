var express = require('express');
var cors = require('cors')

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
app.use(cors())
console.write('cors')

var sortPlans = require('./routes/sortPlans');
app.use('/sortPlans', sortPlans);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/notes', function(req, res) {
	res.json({notes: "This is your notebook. Edit this to start saving your notes!"})
})

app.get('/', index);
app.get('/users', users);

app.post('/users', function (req, res) {
	res.json(
		[
			{
				"success": true
			}
		]
	);
});

app.get('/users/:id', function (req, res) {
	res.json(
		[
			{
				"success": true
			}
		]
	);
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found at all mjg');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
