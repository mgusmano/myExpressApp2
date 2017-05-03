module.exports = function(sequelize, DataTypes) {
	var Model = sequelize.define('User', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
			validate: {isUUID: 4}
		},
		firstName: { type: DataTypes.STRING },
		lastName: { type: DataTypes.STRING }
	});
	return Model
}
