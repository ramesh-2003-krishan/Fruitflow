import express from 'express';
import { deleteProduct, getProductByID, getProducts, saveProduct, updateProduct, searchProducts } from '../controllers/productController.js';


const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.post("/", saveProduct);
productRouter.delete("/:productID", deleteProduct);
productRouter.put("/:productID", updateProduct);
productRouter.get("/search", searchProducts);
productRouter.get("/:productID", getProductByID);



export default productRouter;