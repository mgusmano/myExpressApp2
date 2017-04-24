var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
	res.json(
		[
			{
				"deleted": true,
				"sortPlanName": "plan one",
				"planDesc": "the plan one description",
				"notes": "quick note",
				"id": 2
			}
		]
	);
})

router.put('/', function (req, res) {
	res.send('put sortPlan')
})

router.delete('/', function (req, res) {
	res.send('delete sortPlan')
})

router.patch('/', function (req, res) {
	res.send('patch sortPlan')
})

router.get('/about', function (req, res) {
	res.send('About sortPlan')
})



module.exports = router