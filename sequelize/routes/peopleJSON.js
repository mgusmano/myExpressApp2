module.exports = function(db, app, router, dbutil, models) {
	app.get('/PeopleJSON/:Id', function (req, res) {
		return models.Person.scope('nested').findOne({where: {id: req.params.Id}})
		.then(collection => res.json(collection),err => res.status(500).send(err))
	})
}