module.exports = function(sequelize, app, router, dbutil, models) {






	app.get('/PeopleSQL/:Id', function (req, res) {
		sequelize.query(`select * from People where id = '${req.params.Id}'`, { model: models.Person }).then(
			function(collection){
				res.json(collection)
			})
	}),

	app.get('/PeopleSQL2/:Id', function (req, res) {
		sequelize.query(`select * from People where id = '${req.params.Id}'`, { type: sequelize.QueryTypes.SELECT}).then(
			function(collection){
				res.json(collection)
			})
	}),


	app.get('/PeopleJSON/:Id', function (req, res) {
		return models.Person.scope('nested').findOne({where: {id: req.params.Id}})
		.then(collection => res.json(collection),err => res.status(500).send(err))
	}),
	app.get('/PeopleAll/:Id', function (req, res) {
		return models.Person.scope('nested').findOne({where: {id: req.params.Id}})
		.then(collection => res.json(collection),err => res.status(500).send(err))
	}),
	app.get('/PeopleAll', function (req, res) {
		return models.Person.scope('nested').findAll({})
		.then(collection => res.json({result:'success',data:collection}),err => res.status(500).send(err))
	})
	app.get('/PeopleA/:Id', function (req, res) {
		return models.Person.findOne({
			where: {id: req.params.Id},
			include: [
				{ 
					model: models.Organization, as: 'organization',
					include: [
						{ model: models.Person, as: 'manager' },
					] 
				},
				{ model: models.Office, as: 'office' },
				{ model: models.Action, as: 'actions' },
			]
		})
		.then(collection => res.json(collection),
		err => {
			console.log(err)
//			res.status(500).send(err)
			res.json({result:'error',data:err.toString()})
		})
	})
}



// // Find all projects with a least one task where task.state === project.task
// Project.findAll({
//     include: [{
//         model: Task,
//         where: { state: Sequelize.col('project.state') }
//     }]
// })



