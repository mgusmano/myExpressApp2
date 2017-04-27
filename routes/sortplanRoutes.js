//sortplanModel
//sortplanCollection
//sortplanInstance
//sortplanId
var express = require('express');
var sortplanModel = require('../models/Mongoose/sortplan')
var router = express.Router()
router.route('/')
	.get(function(req,res) {
		var query = {};
		if (req.query.deleted) {
			query.deleted = req.query.deleted
		}
		sortplanModel.find(query, function(err,sortplanCollection) {
			if(err) { res.status(500).send(err) }
			else {
				res.json(sortplanCollection) 
			}
		})
	})
	.post(function(req,res) {
		var sortplanInstance = new sortplanModel(req.body)
		sortplanInstance.save()
		res.status(201).send(sortplanInstance)
	})

router.use('/:sortplanId', function(req, res, next) {
		sortplanModel.findById(req.params.sortplanId, function(err,sortplanInstance) {
			if(err) { res.status(500).send(err) }
			else if (sortplanInstance) {
				req.sortplanInstance = sortplanInstance
				next() 
			}
			else {
				res.status(404).send('no sortplan found')
			}
		})
})

router.route('/:sortplanId')
	.get(function(req,res) {
		res.json(req.sortplanInstance) 
	})
	.put(function(req,res) {
		if (req.body._id) {
			delete req.body._id
		}
		for (var p in req.body) {
			req.sortplan[p] = req.body[p]
		}
		req.sortplan.save(function(err) {
			if (err) {res.status(500).send(err)}
			else {res.json(req.sortplan)}
		})
	})
	.patch(function(req,res) {
		if (req.body._id) {
			delete req.body._id
		}
		for (var p in req.body) {
			req.sortplanInstance[p] = req.body[p]
		}
		req.sortplanInstance.save(function(err) {
			if (err) {res.status(500).send(err)}
			else {res.json(req.sortplanInstance)}
		})
	})
	.delete(function(req,res) {
		req.sortplanInstance.remove(function(err) {
			if (err) {res.status(500).send(err)}
			else {res.status(204).send('removed')}
		})
	})

module.exports = router;
