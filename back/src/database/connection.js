import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.PG_URL, {
	define: {
		createdAt: false,
		updatedAt: false,
		underscored: true,
	},
});

export { sequelize };
