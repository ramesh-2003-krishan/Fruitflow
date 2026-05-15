import express from 'express';
import { deleteProduct, getProducts, saveProduct } from '../controllers/productController.js';


const productRouter = express.Router();

productRouter.get("/", getProducts);

productRouter.post("/", saveProduct);

productRouter.delete("/:productID", deleteProduct);

export default productRouter;