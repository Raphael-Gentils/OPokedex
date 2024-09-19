import { Pokemon } from '../models/associations.js';

const pokemonController = {
	async index(req, res, next) {
		const pokemons = await Pokemon.findAll({
			include: ['types', 'teams'],
			order: [['id', 'ASC']],
		});

		if (!pokemons) {
			return next();
		}

		res.json(pokemons);
	},

	async show(req, res, next) {
		const { id } = req.params;

		const pokemon = await Pokemon.findByPk(id, {
			include: ['types', 'teams'],
		});

		if (!pokemon) {
			return next();
		}

		res.json(pokemon);
	},

	async getPopularPokemons(req, res, next) {
		const pokemons = await Pokemon.findAll({
			order: [
				['votes', 'DESC'],
				['id', 'ASC'],
			],
			limit: 10,
		});

		if (!pokemons) {
			return next();
		}

		res.json(pokemons);
	},

	async addVote(req, res, next) {
		const { id } = req.params;

		const pokemon = await Pokemon.findByPk(id, {
			include: ['types', 'teams'],
		});

		if (!pokemon) {
			return next();
		}

		let votes = pokemon.votes;
		votes++;

		await pokemon.update({ votes: votes });

		res.json(pokemon);
	},

	async removeVote(req, res, next) {
		const { id } = req.params;

		const pokemon = await Pokemon.findByPk(id, {
			include: ['types', 'teams'],
		});

		if (!pokemon) {
			return next();
		}

		let votes = pokemon.votes;
		votes--;

		await pokemon.update({ votes: votes });

		res.json(pokemon);
	},
};

export { pokemonController };
