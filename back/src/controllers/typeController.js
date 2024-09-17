import { Type } from '../models/associations.js';
// import sanitize from 'sanitize-html';
// import Joi from 'joi';

const typeController = {
	async index(req, res) {
		const types = await Type.findAll({
			include: 'pokemons',
			order: [['id', 'ASC']],
		});

		res.json(types);
	},

	async show(req, res) {
		const { id } = req.params;

		const type = await Type.findByPk(id, {
			include: 'pokemons',
			order: [['id', 'ASC']],
		});

		res.json(type);
	},
};

export { typeController };
