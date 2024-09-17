import { Router } from 'express';
import { pokemonRouter } from './pokemonRouter.js';
import { typeRouter } from './typeRouter.js';
import { teamRouter } from './teamRouter.js';
const router = Router();

router.use(pokemonRouter);
router.use(typeRouter);
router.use(teamRouter);

export { router };
