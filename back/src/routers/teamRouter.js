import { Router } from 'express';
import { catchErrors } from '../middlewares/errorHandlers.js';
import { teamController } from '../controllers/teamController.js';
const teamRouter = Router();

teamRouter.get('/teams', catchErrors(teamController.index));
teamRouter.get('/teams/:id(\\d+)', catchErrors(teamController.show));

teamRouter.post('/teams', catchErrors(teamController.store));

teamRouter.patch('/teams/:id(\\d+)', catchErrors(teamController.update));

teamRouter.put(
	'/teams/:teamId(\\d+)/pokemons/:pkmId(\\d+)',
	catchErrors(teamController.addPokemon)
);

teamRouter.delete('/teams/:id(\\d+)', catchErrors(teamController.destroy));
teamRouter.delete(
	'/teams/:teamId(\\d+)/pokemons/:pkmId(\\d+)',
	catchErrors(teamController.removePokemon)
);

export { teamRouter };
