var express = require('express');
module.exports = function(db,bookModel) {
	var router = express.Router()
	router.route('/')
		.get(function(req,res) {
			var query = {}
			tableApi.get(res, query, function(Collection) {
				res.json(Collection) 
			})
		})
		.post(function(req,res) {
			tableApi.post(req.body, function(Instance){
				res.status(201).send(Instance)
		})
	})

	router.route('/Generate')
		.get(function(req,res) {
			tableApi.generate(res, function(Collection) {
				res.json(Collection) 
			})
		})

	router.route('/Init')
		.get(function(req,res) {
			tableApi.init(res, function(Collection) {
				res.json(Collection) 
			})
//			res.json({message:'init'}) 
		})

	router.route('/DeleteAll')
		.get(function(req,res) {
			tableApi.deleteall(res, function(message) {
				res.json(message) 
			})
		})

	router.use('/:Id', function(req, res, next) {
		tableApi.getById(res, req.params.Id, function(Instance) {
			req.id = req.params.Id
			req.Instance = Instance
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
			tableApi.delete(res, req.id, function(id){
				res.json(id)
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
		tableApi.putpatch(res, req.id, newData, function(Instance){
			res.json(Instance)
		})
	}

	return router
}
