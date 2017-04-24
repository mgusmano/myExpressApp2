var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sortPlans', function(req, res, next) {
  //res.send('respond with a resource');
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
});

router.get('/users', function(req, res, next) {
  //res.send('respond with a resource');
	res.json([
		{id: 0001, fn: "Marc9"},
		{id: 0002, fn: "Nick3"},
		{id: 0003, fn: "Andy"}
	]); 
});

module.exports = router;
