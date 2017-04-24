var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
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

module.exports = router;