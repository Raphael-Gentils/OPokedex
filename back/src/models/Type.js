import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection.js';

class Type extends Model {}

Type.init(
	{
		name: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		color: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: 'type',
	}
);

export { Type };
