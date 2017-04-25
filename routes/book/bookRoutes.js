//bookModel
//bookCollection
//bookInstance
//bookId
var express = require('express');
var bookModel = require('./bookModel')
var router = express.Router()
router.route('/')
	.get(function(req,res) {
		var query = {};
		if (req.query.deleted) {
			query.deleted = req.query.deleted
		}
		bookModel.find(query, function(err,bookCollection) {
			if(err) { res.status(500).send(err) }
			else {
				res.json(bookCollection) 
			}
		})
	})
	.post(function(req,res) {
		var bookInstance = new bookModel(req.body)
		bookInstance.save()
		res.status(201).send(bookInstance)
	})

router.use('/:bookId', function(req, res, next) {
		bookModel.findById(req.params.bookId, function(err,bookInstance) {
			if(err) { res.status(500).send(err) }
			else if (bookInstance) {
				req.bookInstance = bookInstance
				next() 
			}
			else {
				res.status(404).send('no book found')
			}
		})
})

router.route('/:bookId')
	.get(function(req,res) {
		res.json(req.bookInstance) 
	})
	.put(function(req,res) {
		if (req.body._id) {
			delete req.body._id
		}
		for (var p in req.body) {
			req.book[p] = req.body[p]
		}
		req.book.save(function(err) {
			if (err) {res.status(500).send(err)}
			else {res.json(req.book)}
		})
	})
	.patch(function(req,res) {
		if (req.body._id) {
			delete req.body._id
		}
		for (var p in req.body) {
			req.bookInstance[p] = req.body[p]
		}
		req.bookInstance.save(function(err) {
			if (err) {res.status(500).send(err)}
			else {res.json(req.bookInstance)}
		})
	})
	.delete(function(req,res) {
		req.bookInstance.remove(function(err) {
			if (err) {res.status(500).send(err)}
			else {res.status(204).send('removed')}
		})
	})

module.exports = router;
