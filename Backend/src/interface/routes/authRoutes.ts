import express from 'express';
import { authController } from '../controllers/authController';

const authRouter = express.Router();

authRouter.post('/register', authController.registerUser);
authRouter.post('/verifyEmail', authController.verifyEmail);
authRouter.post('/login', authController.login)
authRouter.post('/forgetPassword',authController.forgetPassword);
authRouter.put('/setFortgotPassword/:id',authController.setFortgotPassword);
authRouter.post('/refresh-token', authController.refreshToken)

export default authRouter