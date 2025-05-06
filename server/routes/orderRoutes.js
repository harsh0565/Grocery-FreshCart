import express from 'express';
import { getSellerOrders, getUserOrders, placeOrderCOD, placeOrderStripe } from '../controller/orderController.js';
import authUser from '../middlewares/authUser.js';
import authSeller from '../middlewares/authSeller.js';

const orderRouter = express.Router();




orderRouter.post("/cod",authUser, placeOrderCOD);
orderRouter.get("/user",authUser, getUserOrders);
orderRouter.get("/seller", getSellerOrders);
orderRouter.post("/stripe", authUser, placeOrderStripe);


export default orderRouter;