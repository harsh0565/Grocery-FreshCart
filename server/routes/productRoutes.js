import express from 'express';
import { addProduct, changeStock, productById, productList } from '../controller/productController.js';
import authSeller from '../middlewares/authSeller.js';
import multer from 'multer';
const productRouter = express.Router();


const storage = multer.memoryStorage(); // or use diskStorage
// const storage = multer.diskStorage(); // or use diskStorage
const upload = multer({ storage });

productRouter.post("/add", upload.array('images', 4),   authSeller, addProduct);
productRouter.get("/list", productList);
productRouter.get("/id",authSeller, productById);
productRouter.put("/stock", changeStock);


export default productRouter;