import express from 'express';
import createShop from '../controllers/shopController.js';

const shopRouter = express.Router();

shopRouter.post("/",createShop);

export default shopRouter;