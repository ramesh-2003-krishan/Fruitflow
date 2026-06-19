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
        },
        products:[
            {
                productID: {
                    type: String,
                    required: true
                },
                name: {
                    type: String,
                    required: true
                },
                altNames:[
                    {
                        type: String
                    },
                ],
                quantity:{
                        type: Number,
                        required: true
                }
          }
       ],
        location:{
            lng:{
                type: Number,
                required: true
            },
            lat:{
                type: Number,
                required: true
            },
            googleMapUrl:{
                type: String,
                required: true
            }
        }

    }
)

const Shop = mongoose.model("Shop", shopSchema);

export default Shop;

