import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection.js';

class Team extends Model {}

Team.init(
	{
		name: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
		},
	},
	{
		sequelize,
		tableName: 'team',
	}
);

export { Team };
