var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var model = new Schema({
	sortPlanName: { type: String },
	planDesc: { type: String },
	notes: { type: String },
	deleted: { type: Boolean, default: false }
})
module.exports = mongoose.model('sortplan', model);
