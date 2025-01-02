import express from 'express';
import { userController } from '../controllers/userController';
import upload from '../../utils/multer';
import authMiddleware from '../middlewares/auth';


const userRouter = express.Router();

userRouter.put('/editAvatar', authMiddleware, upload.single('image'), userController.editAvatar);
userRouter.put('/updateProfile',authMiddleware, userController.updateProfile);
userRouter.put('/resetPassword/:userId',authMiddleware,userController.resetPassword);

export default userRouter