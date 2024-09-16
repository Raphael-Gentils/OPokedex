import { sequelize } from '../database/connection.js';
import { Pokemon } from './Pokemon.js';
import { PokemonHasType } from './PokemonHasType.js';
import { Team } from './Team.js';
import { PokemonHasTeam } from './PokemonHasTeam.js';
import { Type } from './Type.js';

Pokemon.belongsToMany(Type, {
	as: 'types',
	through: PokemonHasType,
	foreignKey: 'pokemon_id',
	otherKey: 'type_id',
});

Type.belongsToMany(Pokemon, {
	as: 'pokemons',
	through: PokemonHasType,
	foreignKey: 'type_id',
	otherKey: 'pokemon_id',
});

Pokemon.belongsToMany(Team, {
	as: 'teams',
	through: PokemonHasTeam,
	foreignKey: 'pokemon_id',
	otherKey: 'team_id',
});

Team.belongsToMany(Pokemon, {
	as: 'pokemons',
	through: PokemonHasTeam,
	foreignKey: 'team_id',
	otherKey: 'pokemon_id',
});

export { Pokemon, Type, Team, sequelize };
