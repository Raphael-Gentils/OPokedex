import { Router } from 'express';
import { catchErrors } from '../middlewares/errorHandlers.js';
import { typeController } from '../controllers/typeController.js';
const typeRouter = Router();

typeRouter.get('/types', catchErrors(typeController.index));
typeRouter.get('/types/:id(\\d+)', catchErrors(typeController.show));

export { typeRouter };
