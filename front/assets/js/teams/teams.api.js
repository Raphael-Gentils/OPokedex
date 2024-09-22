import { url } from '../config.js';

async function getAllTeams() {
	try {
		const httpResponse = await fetch(`${url}/teams`);

		if (!httpResponse.ok) return null;

		const teams = await httpResponse.json();
		return teams;
	} catch (error) {
		console.log(error);
	}
}

async function getOneTeam(id) {
	try {
		const httpResponse = await fetch(`${url}/teams/${id}`);

		if (!httpResponse.ok) return null;

		const team = await httpResponse.json();
		return team;
	} catch (error) {
		console.log(error);
	}
}

async function createNewTeam(data) {
	try {
		const httpResponse = await fetch(`${url}/teams`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!httpResponse.ok) return null;

		return httpResponse.json();
	} catch (error) {
		console.log(error);
	}
}

async function destroyTeam(id) {
	try {
		const httpResponse = await fetch(`${url}/teams/${id}`, {
			method: 'DELETE',
		});

		if (!httpResponse) return null;

		return true;
	} catch (error) {
		console.log(error);
	}
}

export { getAllTeams, getOneTeam, createNewTeam, destroyTeam };
