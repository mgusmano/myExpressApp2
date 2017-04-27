var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var model = new Schema({
	fn: { type: String }
})
module.exports = mongoose.model('User', model);
