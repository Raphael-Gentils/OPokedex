import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection.js';

class PokemonHasType extends Model {}

PokemonHasType.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		pokemon_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		type_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: 'pokemon_type',
		// l'association d'un pokemon avec un type sera unique dans la table
		indexes: [
			{
				unique: true,
				fields: ['pokemon_id', 'type_id'],
			},
		],
	}
);

export { PokemonHasType };
