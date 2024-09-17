import { Pokemon } from '../models/associations.js';
// import sanitize from 'sanitize-html';
// import Joi from 'joi';

const pokemonController = {
	async index(req, res) {
		const pokemons = await Pokemon.findAll({
			include: ['types', 'teams'],
			order: [['id', 'ASC']],
		});

		res.json(pokemons);
	},

	async show(req, res) {
		const { id } = req.params;

		const pokemon = await Pokemon.findByPk(id, {
			include: ['types', 'teams'],
		});

		res.json(pokemon);
	},
};

export { pokemonController };
