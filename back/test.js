import 'dotenv/config';
import { sequelize } from './src/database/connection.js';

try {
	await sequelize.authenticate();
	console.log('Connection has been established successfully.');
} catch (error) {
	console.error('Unable to connect to the database:', error);
}
