var path = require("path");
module.exports = {

	initModels: function(sequelize) {
		var fs = require("fs");
		var models = {}

		fs.readdirSync(__dirname)
			.filter(function(file) {
				return (file.indexOf(".") !== 0) && (file !== "index.js") && (file !== "dbutil.js");
			})
			.forEach(function(file) {
				console.log(file)
				var model = sequelize.import(path.join(__dirname, file));
				console.log(model)
				models[model.name] = model;
			});

		Object.keys(models).forEach(function(modelName) {
			if ("associate" in models[modelName]) {
				models[modelName].associate(models);
			}
		});

		models.sequelize = sequelize;
//		db.Sequelize = Sequelize;

		return models
	}

}