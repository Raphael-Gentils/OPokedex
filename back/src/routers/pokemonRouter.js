import { Router } from 'express';
import { catchErrors } from '../middlewares/errorHandlers.js';
import { pokemonController } from '../controllers/pokemonController.js';
const pokemonRouter = Router();

pokemonRouter.get('/pokemons', catchErrors(pokemonController.index));
pokemonRouter.get('/pokemons/:id(\\d+)', catchErrors(pokemonController.show));
pokemonRouter.get(
	'/pokemons/leaderboard',
	catchErrors(pokemonController.getPopularPokemons)
);

pokemonRouter.post(
	'/pokemons/:id(\\d+)/votes',
	catchErrors(pokemonController.addVote)
);

pokemonRouter.delete(
	'/pokemons/:id(\\d+)/votes',
	catchErrors(pokemonController.removeVote)
);


export { pokemonRouter };
