import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
    {
        shopID:{
             type: String,
             required: true,
             unique: true
        },
        name:{
            type: String,
            required: true
        },
        address:{
            type: String,
            required: true,
            unique: true
        },
        phone:{
            type: String,
            required: true
        }

    }
)

const Shop = mongoose.model("Shop", shopSchema);

export default Shop;

