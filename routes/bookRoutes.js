var express = require('express');
module.exports = function(bookApi) {
	var router = express.Router()
	router.route('/')
		.get(function(req,res) {
			var query = {}
			bookApi.get(res, query, function(bookCollection) {
				res.json(bookCollection) 
			})
		})
		.post(function(req,res) {
			bookApi.post(req.body, function(bookInstance){
				res.status(201).send(bookInstance)
		})
	})

	router.use('/:bookId', function(req, res, next) {
		bookApi.getById(res, req.params.bookId, function(bookInstance) {
			req.id = req.params.bookId
			req.bookInstance = bookInstance
			next() 
		})
	})

	router.route('/:bookId')
		.get(function(req,res) {
			res.json(req.bookInstance) 
		})
		.delete(function(req,res) {
			bookApi.delete(res, req.id, function(id){
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
		bookApi.putpatch(res, req.id, newData, function(bookInstance){
			res.json(bookInstance)
		})
	}

	return router
}
