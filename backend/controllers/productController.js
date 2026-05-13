import Product from "../models/product.js";

export function getProducts(req, res) {
    Product.find().then(
        (data) => {
            res.json(data);
        }
    )
};

export function saveProduct(req,res){
    
    console.log(req.user);
    if (req.user == null){
        res.status(403).json({
            "message" : "Unauthorized"
        })
        return;
    }
    if(req.user.role != "admin"){
        res.status(403).json({
            "message" : "Unauthorized"
        })
        return;
    }
        const product = new Product(
            {
                name: req.body.name,
                taste: req.body.taste,
                price: req.body.price,
                stock: req.body.stock,
                vendorid: req.body.vendorid
            }
        );
        product.save().then(()=> {
                res.json({ message: "Product saved successfully" });
            }).catch((err) => {
                res.json({ message: "Error saving product", error: err });
            }
        )};