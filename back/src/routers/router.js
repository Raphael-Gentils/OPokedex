import { Router } from 'express';
import { pokemonRouter } from './pokemonRouter.js';
import { typeRouter } from './typeRouter.js';
import { teamRouter } from './teamRouter.js';
import { authRouter } from './authRouter.js';

const router = Router();

router.use('/auth', authRouter);
router.use(pokemonRouter);
router.use(typeRouter);
router.use(teamRouter);

export { router };
