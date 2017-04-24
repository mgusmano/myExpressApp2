var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res, next) {
  //res.send('respond with a resource');
	res.json([
		{id: 0001, fn: "Marc9"},
		{id: 0002, fn: "Nick3"},
		{id: 0003, fn: "Andy"}
	]); 
});

module.exports = router;
