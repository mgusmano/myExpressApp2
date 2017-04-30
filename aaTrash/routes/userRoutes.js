//userModel
//userCollection
//userInstance
//userId
//user
var express = require('express');
var userModel = require('../models/Mongoose/user')
var router = express.Router()
router.route('/')
	.get(function(req,res) {
		var query = {};
		if (req.query.deleted) {
			query.deleted = req.query.deleted
		}
		userModel.find(query, function(err,userCollection) {
			if(err) { res.status(500).send(err) }
			else {
				res.json(userCollection) 
			}
		})
	})
	.post(function(req,res) {
		var userInstance = new userModel(req.body)
		userInstance.save()
		res.status(201).send(userInstance)
	})

router.use('/:userId', function(req, res, next) {
		userModel.findById(req.params.userId, function(err,userInstance) {
			if(err) { res.status(500).send(err) }
			else if (userInstance) {
				req.userInstance = userInstance
				next() 
			}
			else {
				res.status(404).send('no user found')
			}
		})
})

router.route('/:userId')
	.get(function(req,res) {
		res.json(req.userInstance) 
	})
	.put(function(req,res) {
		if (req.body._id) {
			delete req.body._id
		}
		for (var p in req.body) {
			req.user[p] = req.body[p]
		}
		req.user.save(function(err) {
			if (err) {res.status(500).send(err)}
			else {res.json(req.user)}
		})
	})
	.patch(function(req,res) {
		if (req.body._id) {
			delete req.body._id
		}
		for (var p in req.body) {
			req.userInstance[p] = req.body[p]
		}
		req.userInstance.save(function(err) {
			if (err) {res.status(500).send(err)}
			else {res.json(req.userInstance)}
		})
	})
	.delete(function(req,res) {
		req.userInstance.remove(function(err) {
			if (err) {res.status(500).send(err)}
			else {res.status(204).send('removed')}
		})
	})

module.exports = router;
