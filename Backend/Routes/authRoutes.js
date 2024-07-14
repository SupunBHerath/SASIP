import express from 'express';
import { login } from '../Controllers/AdminLogin.js';
import { checkToken } from '../Middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.get('/check-token', checkToken);

export default router;
