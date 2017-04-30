module.exports = function(model) {
	var express = require('express');
	var router = express.Router()
	router.route('/')
		.get(function(req,res) {
			model.get(res, function(response) {
				res.json(response) 
			})
		})
		.post(function(req,res) {
			model.post(res, req.body, function(Instance){
				res.status(201).send(Instance)
		})
	})

	router.route('/Model/DropTable').get(function(req,res) { model.droptable(res, function(response) { res.json(response) }) })
	router.route('/Model/CreateTable').get(function(req,res) { model.createtable(res, function(response) {res.json(response) }) })
	router.route('/Model/GenerateData').get(function(req,res) { model.generatedata(res, function(response) { res.json(response) }) })
	router.route('/Model/DeleteAll').get(function(req,res) { model.deleteall(res, function(response) { res.json(response) }) })

	// router.route('/Init')
	// 	.get(function(req,res) {
	// 		model.init(res, function(response) {
	// 			res.json(response) 
	// 		})
	// 	})

	// router.route('/DeleteAll')
	// 	.get(function(req,res) {
	// 		model.deleteall(res, function(message) {
	// 			res.json(message) 
	// 		})
	// 	})

	router.use('/:Id', function(req, res, next) {
		model.getById(res, req.params.Id, function(Instance) {
			req.id = req.params.Id
			req.Instance = Instance
			req.InstanceData = Instance.data
			next() 
		})
	})

	router.route('/:Id')
		.post(function(req,res) {
			res.status(500).send('cannot post with parameter')
		})
		.get(function(req,res) {
			res.json(req.Instance) 
		})
		.delete(function(req,res) {
			model.delete(res, req.id, function(response){
				res.json(response)
			})
		})
		.put(function(req,res) {
			putpatch(req,res)
		})
		.patch(function(req,res) {
			putpatch(req,res)
		})

	function putpatch(req,res) {
		if (req.body.id) {
			delete req.body.id
		}
		var newData = {}
		for (var p in req.body) {
			newData[p] = req.body[p]
		}
		model.putpatch(res, req.id, newData, function(response){
			res.json(response)
		})
	}

	return router
}
