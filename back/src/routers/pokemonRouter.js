import { Router } from 'express';
import { catchErrors } from '../middlewares/errorHandlers.js';
import { pokemonController } from '../controllers/pokemonController.js';
const pokemonRouter = Router();

pokemonRouter.get('/pokemons', catchErrors(pokemonController.index));

export { pokemonRouter };
