import 'dotenv/config';
import { sequelize } from '../models/associations.js';

const createTables = async function () {
	try {
		await sequelize.drop();

		setTimeout(async () => {
			await sequelize.sync();
			process.exit(0);
		}, 5000);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

createTables();
