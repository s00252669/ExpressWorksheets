import { Router } from 'express';
import { AuthController } from '../controllers/auth';
import { validate } from '../middleware/validate.middleware';
import { authenticateJWT } from '../middleware/auth.middleware';
import { loginZSchema, registerZSchema } from '../models/users';

const router = Router();
const authController = new AuthController();

router.post('/register', validate(registerZSchema), authController.register);
router.post('/login', validate(loginZSchema), authController.login);
router.get('/me', authenticateJWT, authController.me);

export default router;