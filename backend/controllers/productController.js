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

export async function updateProduct(req, res){
    if(!isAdmin(req)){
        res.status(403).json({
            "message" : "only admin can update products"
        })
        return;
    }

    const productID = req.params.productID;
    const updatingData = req.body;

    try{
        await Product.updateOne(
            {productID: productID},
            updatingData
        )
        res.json({
            message: "Product updated successfully"
        });
    }catch(err){
        res.status(500).json({
            message: "Error updating product",
            error: err
        });
    }
}

export async function getProductByID(req, res){
    const productID = req.params.productID;
    try{
        const product = await Product.findOne({
            productID: productID

        })
        if(productID == null){
            res.status(404).json({
                message: "Product not found"
            });
            return;
        }
        if(Product.isAvalaible){
            res.json(product);
        }else{
            if(!isAdmin(req)){
                res.status(403).json({
                    message: "Only admin can access this product"
                });
                return;
            }else{
                res.json(product);
            }
     }
    }catch(err){
        res.status(500).json({
            message: "Error fetching product",
            error: err
        });
    }
}

export async function searchProducts(req, res){
    try{
        const { name} = req.query;
        const query = {};
        if(name){
            query.name = { $regex: name, $options: "i" };
        }
        const products = await Product.find(query);
        res.status(200).json(products);
    }catch(err){
        res.status(500).json({
            message: "Error searching products",
            error: err
        });
    }
}