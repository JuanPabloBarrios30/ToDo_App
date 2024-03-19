import express from 'express';
import {
    registerMethod,
    loginMethod,
    logoutMethod,
    profile
} from '../../controllers/users/user.controller.js';
import { authRequired } from '../../middlewares/auth.middleware.js';
import { validateSchema } from '../../middlewares/validator.middleware.js';
import { registerSchema, loginSchema } from '../../schemas/user.schema.js';
const router = express.Router();

// /api/users
router.post('/register', validateSchema(registerSchema), registerMethod);
router.post('/login', validateSchema(loginSchema), loginMethod);
router.post('/logout', logoutMethod);
router.get('/profile', [authRequired], profile);

export default router;