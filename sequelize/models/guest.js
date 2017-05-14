"use strict";
module.exports = function(sequelize, DataTypes) {
	var Model = sequelize.define("Guest", {
			id: {
					type: DataTypes.UUID,
					defaultValue: DataTypes.UUIDV4,
					allowNull: false,
					primaryKey: true,
					validate: {
							isUUID: 4
					}
			},
			facebookid: {
					type: DataTypes.STRING,
					allowNull: false,
					searchable: true,
					unique: {
							msg: 'An guest with this id already exists.'
					}
			},
			name: {
					type: DataTypes.STRING,
					allowNull: true,
					searchable: true
			},
			apnstoken: {
					type: DataTypes.STRING,
					allowNull: true,
					searchable: true
			}
		}
	);
	return Model;
};
