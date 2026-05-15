import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        productID:{
            type: String,
            required: true,
            unique: true
        },
        name:{
            type: String,
            required: true
        },
        altNames:[
            {
                type: String
            }
        ],
        lablePrice:{
            type: Number,
            required: true
        },
        price:{
            type: Number,
            required: true
        },
        stock:{
            type: Number,
            required: true
        },
        images:[
            {
                type: String
            }
        ],
        isAvalaible:{
            type: Boolean,
            required: true,
        }
    }
);
const Product = mongoose.model("Products", productSchema);

export default Product;