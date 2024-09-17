import { Team } from '../models/associations.js';
// import sanitize from 'sanitize-html';
// import Joi from 'joi';

const teamController = {
	async index(req, res) {
		const teams = await Team.findAll({
			include: 'pokemons',
			order: [['id', 'ASC']],
		});

		res.json(teams);
	},

	async show(req, res) {
		const { id } = req.params;

		const team = await Team.findByPk(id, {
			include: 'pokemons',
			order: [['id', 'ASC']],
		});

		res.json(team);
	},
};

export { teamController };
