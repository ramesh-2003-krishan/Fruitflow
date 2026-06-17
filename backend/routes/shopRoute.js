import express from 'express';
import createShop, { deleteShop, getShops, updateShop } from '../controllers/shopController.js';


const shopRouter = express.Router();

shopRouter.post("/",createShop);
shopRouter.get("/",getShops);
shopRouter.put("/:shopID",updateShop);
shopRouter.delete("/:shopID",deleteShop);



export default shopRouter;