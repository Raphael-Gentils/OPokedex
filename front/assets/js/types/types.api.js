import { url } from '../config.js';

async function getAllTypes() {
	try {
		const httpResponse = await fetch(`${url}/types`);

		if (!httpResponse.ok) return null;

		const types = await httpResponse.json();
		return types;
	} catch (error) {
		console.log(error);
	}
}

async function getOneType(id) {
	try {
		const httpResponse = await fetch(`${url}/types/${id}`);

		if (!httpResponse.ok) return null;

		const type = await httpResponse.json();
		return type;
	} catch (error) {
		console.log(error);
	}
}

export { getAllTypes, getOneType };
