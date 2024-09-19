import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection.js';

class Pokemon extends Model {}

Pokemon.init(
	{
		name: {
			type: DataTypes.TEXT,
			allowNull: false,
			unique: true,
		},
		hp: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		atk: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		def: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		atk_spe: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		def_spe: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		speed: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		votes: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
	},
	{
		sequelize,
		tableName: 'pokemon',
	}
);

export { Pokemon };
