import express from 'express';
import { isSellerAuth, sellerLogin,logoutSeller } from '../controller/sellerController.js';
import authSeller from '../middlewares/authSeller.js';
const SellerRouter = express.Router();




SellerRouter.post("/login", sellerLogin);
SellerRouter.get("/is-auth",authSeller, isSellerAuth);
SellerRouter.get("/logout",authSeller, logoutSeller);

export default SellerRouter;