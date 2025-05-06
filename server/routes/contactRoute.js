import express from 'express';
import authUser from '../middlewares/authUser.js';
import authSeller from '../middlewares/authSeller.js';
import { getContacts, submitContact } from '../controller/contactController.js';
const contactRouter = express.Router();




contactRouter.post("/send", authUser ,submitContact);
contactRouter.get("/get",  getContacts);


export default contactRouter;