import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function getProducts(req, res) {
    try{
        if(isAdmin(req)){
            const products = await Product.find();
            res.json(products);
        }else{
            const products = await Product.find({isAvalaible: true});
            res.json(products);
        }
    }catch(err){
        res.json({
            message: "Error fetching products",
            error: err
        })
    
}
};

export function saveProduct(req,res){
    
        if(isAdmin(req)){
            res.status(403).json({
                "message" : "only admin can create products"
            });
            return;
        }

        const product = new Product(
            req.body
        );
        product.save().then(()=> {
                res.json({ message: "Product saved successfully" });
            }).catch((err) => {
                res.json({ message: "Error saving product", error: err });
            }
        )};

export async function deleteProduct(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            "message" : "only admin can delete products"
        });
        return;
    }
    try{
        await Product.deleteOne({productID: req.params.productID});
        res.json({
            message: "Product deleted successfully"
        });
    }catch(err){
        res.status(500).json({
            message: "Error deleting product",
            error: err
        });
    }
}        