module.exports = function(sequelize, DataTypes) {
	var Model = sequelize.define('Book', {
		// "_id": {
		// 	type: DataTypes.UUID,
		// 	defaultValue: DataTypes.UUIDV4,
		// 	allowNull: false,
		// 	primaryKey: true,
		// 	validate: {isUUID: 4}
		// },
		title: {type: DataTypes.STRING},
		author: {type: DataTypes.STRING},
		genre: {type: DataTypes.STRING},
		read: {type: DataTypes.BOOLEAN, defaultValue: false}
	});
	return Model
}
