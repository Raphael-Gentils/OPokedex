import { Router } from 'express';
import { catchErrors } from '../middlewares/errorHandlers.js';
import { authController } from '../controllers/authController.js';

const authRouter = Router();

// Route d'inscription
authRouter.post('/signup', catchErrors(authController.signup));

// Route de connexion
authRouter.post('/login', catchErrors(authController.login));

// Route de déconnexion
authRouter.post('/logout', catchErrors(authController.logout));

export { authRouter };
