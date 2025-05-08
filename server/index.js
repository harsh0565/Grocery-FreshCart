
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from "./config/db.js";
import userRouter from './routes/userRoutes.js';
import SellerRouter from './routes/sellerRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoutes.js';
import connectCloudinary from './config/cloudinary.js';
import { stripeWebhook } from './controller/orderController.js';
import contactRouter from './routes/contactRoute.js';

dotenv.config(); 

const app = express();

const startServer = async () => {
  try {
    await connectDB();
    // await connectCloudinary();

    const allowedOrigin = ['http://localhost:5173' , 'https://freshcart-red.vercel.app'];
    app.post('/stripe',express.raw({ type: 'application/json' }),stripeWebhook);

    app.use(express.json());
    app.use(cors({ origin: allowedOrigin, credentials: true }));
    app.use(cookieParser());

    app.use('/api/user', userRouter);
    app.use('/api/seller', SellerRouter);
    app.use('/api/product', productRouter);
    app.use('/api/cart', cartRouter);
    app.use('/api/address', addressRouter);
    app.use('/api/order', orderRouter);
    app.use('/api/contact', contactRouter);
    app.get('/test', (req, res) => {
      console.log('Test route accessed');
      res.send('Backend is running!');
    });

    app.get('/', (req, res) => {
      res.send('Backend is running!');
    });

    const Port = process.env.PORT || 5000;
    app.listen(Port, () => {
      console.log(`Server is running on http://localhost:${Port}`);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1); 
  }
};

startServer();



