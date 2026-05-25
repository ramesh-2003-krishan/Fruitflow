import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        orderID:{
            type: String,
            required: true,
            unique: true
        },
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        phone:{
            type: String,
            required: true
        },
        address:{
            type: String,
            required: true
        },
        status:{
            type: String,
            required: true,
            default: "pending"
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
        date:{
            type: Date,
            required: true
        }
        
        

    }
   
);
const Order = mongoose.model("Orders", orderSchema);

export default Order;