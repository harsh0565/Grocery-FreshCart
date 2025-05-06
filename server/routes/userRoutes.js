import express from 'express';
import { forgotPassword, isAuth, loginUser, logoutUser, registerUser, sendOtp, verifyOtp } from '../controller/userController.js';
import authUser  from '../middlewares/authUser.js';
const userRouter = express.Router();


userRouter.post('/register', registerUser);
userRouter.post('/send-otp', sendOtp);
userRouter.post('/verify-otp', verifyOtp);
userRouter.post('/forgot-password', forgotPassword);

userRouter.post('/login', loginUser);
userRouter.get('/is-auth',  authUser , isAuth);
userRouter.get('/logout',  authUser , logoutUser);


export default userRouter;