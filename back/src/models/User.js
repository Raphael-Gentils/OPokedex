import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection.js';

class User extends Model {}

User.init(
	{
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: 'users',
	}
);

export { User };
