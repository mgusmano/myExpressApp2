module.exports = function(sequelize, app, router, dbutil, models) {

	app.get('/APNs', function (req, res) {
		res.json({result: "success"})
	})

}
