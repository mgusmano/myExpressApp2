var express = require('express')
var bodyParser = require('body-parser')
var low = require('lowdb')
//var _ = require('lodash')
const uuid = require('uuid')
var _ = require('lodash-id')
//var _ = require('lodash')
var router = express.Router()
const db = low('db2.json')
const sortPlans = db.get('sortPlans')

// create application/json parser 
// { type: 'application/*+json' }
var jsonParser = bodyParser.json({ type: 'application/*+json' })
 
// create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false })



router.get('/', function(req, res, next) {
//	const db = low('db2.json')
//	db.defaults({ sortPlans: [] })
//	.write()
	sortPlans.value()
	//console.log(post)
	res.send(sortPlans)
})

router.patch('/:id', urlencodedParser, function (req, res) {
	console.log('****** patch sortPlan')
	console.log('****** req.params.id')
	console.log(req.params.id)
	console.log(req)
	console.log('****** patch sortPlan body')
	console.log(req.body.data)

// 	sortPlans
// 		.find({id: req.body.data.id})
// 		.assign(req.body.data)
// //		.value()
// 		.write()



	 console.log('****** before')
	// const sortPlan = _.updateById(sortPlans, req.params.id, req.body.data)
	// console.log('****** after')
	// console.log('****** after')

	// try {
	// 	_.upsert(db.sortPlans, { id: req.params.id, sortPlanName: 'ch' })
	// } catch (err) {
	// 	console.log(err)
	// }

	_.upsert(db.get('sortPlans').id, { id: req.params.id, sortPlanName: 'ch' })

		// var s = sortPlans
		// .find({ id: req.params.id })
		// .value()

		// console.log(s)


		// sortPlans.updateById(req.params.id, req.body.data)
		// sortPlans.value()
		// sortPlans.write()
		// console.log('****** after')




	//res.send('patch sortPlan')
	res.send({success: true})
})

router.put('/:id', urlencodedParser, function (req, res) {
	console.log('****** put sortPlan')
	console.log(req)
	console.log('****** put sortPlan body')
	console.log(req.body.data)
	//res.send('patch sortPlan')
	res.send({success: true})
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

router.delete('/', function (req, res) {
	res.send('delete sortPlan')
})

router.get('/about', function (req, res) {
	res.send('About sortPlan')
})

module.exports = router