console.log('using mongoose')
var mongoose = require('mongoose')
//var db = mongoose.connect('mongodb://localhost/bookAPI')
var db = mongoose.connect('mongodb://mgusmano:Gusheandy1@cluster0-shard-00-00-gxxh8.mongodb.net:27017,cluster0-shard-00-01-gxxh8.mongodb.net:27017,cluster0-shard-00-02-gxxh8.mongodb.net:27017/bookAPI?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin')
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.on('connected', function () {console.log('Mongoose connection open');});

module.exports = {
	reset: function() {
		console.info('(TBD) Populating database with example data...');
	}
}