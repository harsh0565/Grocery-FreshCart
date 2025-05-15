import express from 'express';
import { googleLogin } from '../controller/googleAuthController.js';

const authRouter = express.Router();




authRouter.post("/google", googleLogin);




export default authRouter;