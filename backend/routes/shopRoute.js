import express from 'express';
import createShop, { getShops } from '../controllers/shopController.js';


const shopRouter = express.Router();

shopRouter.post("/",createShop);
shopRouter.get("/",getShops);



export default shopRouter;