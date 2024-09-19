import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.PG_URL, {
	define: {
		timestamps: false,
	},
});

export { sequelize };
