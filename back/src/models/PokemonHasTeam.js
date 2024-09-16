import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection.js';

class PokemonHasTeam extends Model {}

PokemonHasTeam.init(
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
		team_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: 'team_pokemon',
		// l'association d'un pokemon avec un type sera unique dans la table
		indexes: [
			{
				unique: true,
				fields: ['pokemon_id', 'team_id'],
			},
		],
	}
);

export { PokemonHasTeam };
