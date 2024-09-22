import { url } from '../config.js';

async function getAllPokemons() {
	try {
		const httpResponse = await fetch(`${url}/pokemons`);

		if (!httpResponse.ok) return null;

		const pokemons = await httpResponse.json();
		return pokemons;
	} catch (error) {
		console.log(error);
	}
}

async function getOnePokemon(id) {
	try {
		const httpResponse = await fetch(`${url}/pokemons/${id}`);

		if (!httpResponse.ok) return null;

		const pokemon = await httpResponse.json();
		return pokemon;
	} catch (error) {
		console.log(error);
	}
}

async function addVoteToOnePkm(id) {
	try {
		const httpResponse = await fetch(`${url}/pokemons/${id}/votes`, {
			method: 'POST',
		});

		if (!httpResponse.ok) return null;

		const pokemon = await httpResponse.json();
		return pokemon;
	} catch (error) {
		console.log(error);
	}
}

async function removeVoteToOnePkm(id) {
	try {
		const httpResponse = await fetch(`${url}/pokemons/${id}/votes`, {
			method: 'DELETE',
		});

		if (!httpResponse.ok) return null;

		const pokemon = await httpResponse.json();
		return pokemon;
	} catch (error) {
		console.log(error);
	}
}

async function getMostPopularPkm() {
	try {
		const httpResponse = await fetch(`${url}/pokemons/leaderboard`);

		if (!httpResponse.ok) return null;

		const popularTen = await httpResponse.json();
		return popularTen;
	} catch (error) {
		console.log(error);
	}
}

export {
	getAllPokemons,
	getOnePokemon,
	addVoteToOnePkm,
	removeVoteToOnePkm,
	getMostPopularPkm,
};
