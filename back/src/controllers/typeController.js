import { Type } from '../models/associations.js';

const typeController = {
	async index(req, res, next) {
		const types = await Type.findAll({
			include: { association: 'pokemons', include: 'teams' },
			order: [['id', 'ASC']],
		});

		if (!types) {
			return next();
		}

		res.json(types);
	},

	async show(req, res, next) {
		const { id } = req.params;

		const type = await Type.findByPk(id, {
			include: { association: 'pokemons', include: 'teams' },
			order: [
				['id', 'ASC'],
				['pokemons', 'id', 'ASC'],
			],
		});

		if (!type) {
			return next();
		}

		res.json(type);
	},
};

export { typeController };
