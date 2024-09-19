import { apiBaseUrl } from './config.js';

export const api = {
	async fetchAllPokemons() {
		try {
			const httpResponse = await fetch(`${apiBaseUrl}/pokemons`);

			if (!httpResponse.ok) return null;

			const pokemons = await httpResponse.json();
			return pokemons;
		} catch (error) {
			console.log(error);
		}
	},

	async fetchOnePokemon(id) {
		try {
			const httpResponse = await fetch(`${apiBaseUrl}/pokemons/${id}`);

			if (!httpResponse.ok) return null;

			const pokemon = await httpResponse.json();
			return pokemon;
		} catch (error) {
			console.log(error);
		}
	},

	async fetchAllTypes() {
		try {
			const httpResponse = await fetch(`${apiBaseUrl}/types`);

			if (!httpResponse.ok) return null;

			const types = await httpResponse.json();
			return types;
		} catch (error) {
			console.log(error);
		}
	},

	async fetchOneType(id) {
		try {
			const httpResponse = await fetch(`${apiBaseUrl}/types/${id}`);

			if (!httpResponse.ok) return null;

			const type = await httpResponse.json();
			return type;
		} catch (error) {
			console.log(error);
		}
	},

	async fetchAllTeams() {
		try {
			const httpResponse = await fetch(`${apiBaseUrl}/teams`);

			if (!httpResponse.ok) return null;

			const teams = await httpResponse.json();
			return teams;
		} catch (error) {
			console.log(error);
		}
	},

	async fetchOneTeam(id) {
		try {
			const httpResponse = await fetch(`${apiBaseUrl}/teams/${id}`);

			if (!httpResponse.ok) return null;

			const team = await httpResponse.json();
			return team;
		} catch (error) {
			console.log(error);
		}
	},

	async addVoteToOnePkm(id) {
		try {
			const httpResponse = await fetch(`${apiBaseUrl}/pokemons/${id}/votes`, {
				method: 'POST',
			});

			if (!httpResponse.ok) return null;

			const pokemon = await httpResponse.json();
			return pokemon;
		} catch (error) {
			console.log(error);
		}
	},

	async removeVoteToOnePkm(id) {
		try {
			const httpResponse = await fetch(`${apiBaseUrl}/pokemons/${id}/votes`, {
				method: 'DELETE',
			});

			if (!httpResponse.ok) return null;

			const pokemon = await httpResponse.json();
			return pokemon;
		} catch (error) {
			console.log(error);
		}
	},
};
