import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name : String,
        taste : String,
        price : Number,
        stock : Number,
        vendorid : String
    }
);
const Product = mongoose.model("Products", productSchema);

export default Product;