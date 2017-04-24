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

router.post('/', function (req, res) {
	res.send('post sortPlan')

	const db = low('db.json')

// Set some defaults if your JSON file is empty
// db.defaults({ posts: [], user: {} })
//   .write()

// Add a post
db.get('sortPlan')
	.push(
		{
			"deleted": true,
			"sortPlanName": "plan two",
			"planDesc": "the plan one description",
			"notes": "quick note"
		}
	)
	.write()

// Set a user
// db.set('user.name', 'typicode')
//   .write()






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