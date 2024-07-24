import express from 'express';
import { login } from '../Controllers/AdminLogin.js';
import { checkToken } from '../Middleware/auth.js';
import { forgotPassword } from '../Controllers/ForgotPassword.js';
import { resetPassword } from '../Controllers/ResetPassword.js';

const router = express.Router();

router.post('/login', login);
router.get('/check-token', checkToken);
router.post('/forgot-password', forgotPassword);
router.post('/delete-image', resetPassword);

export default router;
