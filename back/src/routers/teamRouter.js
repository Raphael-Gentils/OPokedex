import { Router } from 'express';
import { catchErrors } from '../middlewares/errorHandlers.js';
import { teamController } from '../controllers/teamController.js';
const teamRouter = Router();

teamRouter.get('/teams', catchErrors(teamController.index));
teamRouter.get('/teams/:id(\\d+)', catchErrors(teamController.show));

export { teamRouter };
