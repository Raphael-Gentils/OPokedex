import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
const app = express();

app.use(
	cors({
		origin: [
			'http://localhost',
			'http://127.0.0.1',
			'http://127.0.0.1:5173',
			'http://localhost:5173',
		],
	})
);

import { router } from './src/routers/router.js';
import { notFound, errorHandler } from './src/middlewares/errorHandlers.js';
import { loadUserToLocals } from './src/middlewares/loadUserToLocals.js';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Charger les données de la sessions sur `req.session` et `res.locals`
app.use(
	session({
		saveUninitialized: true,
		resave: true,
		secret: 'Un secret pour signer les id de sessions',
	})
);
app.use(loadUserToLocals);

app.use('/api', router);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
	console.log(`listening on ${process.env.BASE_URL}:${process.env.PORT}`);
});
