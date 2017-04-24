var express = require('express')
var low = require('lowdb')
//var _ = require('lodash')
const uuid = require('uuid')
require('lodash-id')
var router = express.Router()
const db = low('db2.json')
const sortPlans = db.get('sortPlans')

router.get('/', function(req, res, next) {
//	const db = low('db2.json')
//	db.defaults({ sortPlans: [] })
//	.write()
	sortPlans.value()
	//console.log(post)
	res.send(sortPlans)
})

router.patch('/:id', function (req, res) {
	console.log('patch sortPlan')
	console.log(req)
	res.send('patch sortPlan')
})

router.post('/', function (req, res) {
//	console.log('in post')

	// const db = low('db2.json')
	//db.defaults({ sortPlans: [] })
//  sortPlans.write()

//	db._.mixin(require('lodash-id'))

//	console.log(db.sortPlans)

// Set some defaults if your JSON file is empty
// db.defaults({ posts: [], user: {} })
//   .write()

// const post = _.insert(db.sortPlans, { 
// 		"deleted": true,
// 		"sortPlanName": "plan two",
// 		"planDesc": "the plan one description",
// 		"notes": "quick note"
// })

// // Add a post
sortPlans
	.push(
		{
			"id": uuid(),
			"deleted": false,
			"sortPlanName": "plan two",
			"planDesc": "the plan one description",
			"notes": "quick note"
		}
	)
	.write()

	res.send({success: true})

})

router.put('/', function (req, res) {
	res.send('put sortPlan')
})

router.patch('/', function (req, res) {
	res.send('patch sortPlan')
})

router.delete('/', function (req, res) {
	res.send('delete sortPlan')
})

router.get('/about', function (req, res) {
	res.send('About sortPlan')
})

module.exports = router