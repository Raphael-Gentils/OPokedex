import { Pokemon, Team } from '../models/associations.js';
import { PokemonHasTeam } from '../models/PokemonHasTeam.js';
import sanitize from 'sanitize-html';
import Joi from 'joi';

const teamController = {
	async index(req, res, next) {
		const teams = await Team.findAll({
			include: {
				association: 'pokemons',
				include: 'types',
			},
			order: [
				['id', 'ASC'],
				['pokemons', 'id', 'ASC'],
			],
		});

		if (!teams) {
			return next();
		}

		res.json(teams);
	},

	async show(req, res, next) {
		const { id } = req.params;

		const team = await Team.findByPk(id, {
			include: {
				association: 'pokemons',
				include: 'types',
			},
			order: [
				['id', 'ASC'],
				['pokemons', 'id', 'ASC'],
			],
		});

		if (!team) {
			return next();
		}

		res.json(team);
	},

	async store(req, res, next) {
		const { name, description } = req.body;

		const schema = Joi.object({
			name: Joi.string().min(3).required().messages({
				'string.empty': 'Le champ du nom ne doit pas être vide.',
				'string.min': 'Le titre doit contenir au moins {#limit} caractères.',
				'any.required': "Le nom de l'équipe est obligatoire.",
			}),
			description: Joi.string().max(50).empty('').messages({
				'string.max': 'La description peut faire maximum {#limit} caractères.',
			}),
		});

		const { error } = schema.validate({ name, description });

		if (error) {
			return next(error);
		}

		const team = await Team.create({
			name: sanitize(name),
			description: sanitize(description),
		});

		res.status(201).json(team);
	},

	async update(req, res, next) {
		const { id } = req.params;
		const { name, description } = req.body;

		const teamToUpdate = await Team.findByPk(id);

		if (!teamToUpdate) {
			return next();
		}

		// l'utilisateur n'est pas obligé de renseigner un nom ou une description
		const schema = Joi.object({
			name: Joi.string().min(3).empty('').messages({
				'string.min': 'Le titre doit contenir au moins {#limit} caractères.',
			}),
			description: Joi.string().max(50).empty('').messages({
				'string.max': 'La description peut faire maximum {#limit} caractères.',
			}),
		});

		const { error } = schema.validate({ name, description });

		if (error) {
			return next(error);
		}

		// si les champs name et/ou description sont vides on garde les données pré-existantes
		const updatedTeam = await teamToUpdate.update({
			name: sanitize(name) || teamToUpdate.name,
			description: sanitize(description) || teamToUpdate.description,
		});

		res.json(updatedTeam);
	},

	async addPokemon(req, res, next) {
		const teamId = req.params.teamId;
		const pkmId = req.params.pkmId;

		const teamToUpdate = await Team.findByPk(teamId, {
			include: { association: 'pokemons', include: 'types' },
		});

		if (!teamToUpdate) {
			return next();
		}

		const pokemonToAdd = await Pokemon.findByPk(pkmId);

		if (!pokemonToAdd) {
			return next();
		}

		// limite à 6 le nombre de pokémons dans l'équipe
		if (teamToUpdate.pokemons.length > 5) {
			return res.status(403).json(`Erreur 403 - L'équipe est déjà complète.`);
		}

		// vérifie que l'équipe ne possède pas dèjà le pokémon à ajouter
		const foundPokemon = teamToUpdate.pokemons.find(
			(pokemon) => pokemon.dataValues.id === Number(pkmId)
		);

		if (foundPokemon) {
			return res.status(403).json(`Erreur 403 - Ce pokémon est déjà présent.`);
		}

		// associe le pokémon à l'équipe avec la table de liaison
		await PokemonHasTeam.create({ pokemon_id: pkmId, team_id: teamId });

		const updatedTeam = await Team.findByPk(teamId, {
			include: {
				association: 'pokemons',
				include: 'types',
			},
			order: [
				['id', 'ASC'],
				['pokemons', 'id', 'ASC'],
			],
		});

		res.json(updatedTeam);
	},

	async destroy(req, res, next) {
		const { id } = req.params;

		const teamToDestroy = await Team.findByPk(id);

		if (!teamToDestroy) {
			return next();
		}

		await PokemonHasTeam.destroy({ where: { team_id: id } });
		await teamToDestroy.destroy();

		res.sendStatus(204);
	},

	async removePokemon(req, res, next) {
		const teamId = req.params.teamId;
		const pkmId = req.params.pkmId;

		const teamToUpdate = await Team.findByPk(teamId, {
			include: { association: 'pokemons', include: 'types' },
		});

		if (!teamToUpdate) {
			return next();
		}

		const pokemonToRemove = teamToUpdate.pokemons.find(
			(pokemon) => pokemon.dataValues.id === Number(pkmId)
		);

		if (!pokemonToRemove) {
			return next();
		}

		await PokemonHasTeam.destroy({
			where: { pokemon_id: pkmId, team_id: teamId },
		});

		const updatedTeam = await Team.findByPk(teamId, {
			include: {
				association: 'pokemons',
				include: 'types',
			},
			order: [
				['id', 'ASC'],
				['pokemons', 'id', 'ASC'],
			],
		});

		res.json(updatedTeam);
	},
};

export { teamController };
