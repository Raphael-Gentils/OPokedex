import 'dotenv/config';
import cors from 'cors';
import express from 'expres';
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

app.use(express.json());

app.use(router);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
	console.log(`listening on ${process.env.BASE_URL}:${process.env.PORT}`);
});
