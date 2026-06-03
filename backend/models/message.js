import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        name :{
            type:String,
            required : true
        },
        email :{
            type : String,
            required : true,
            unique : true
        },
        phone :{
            type : String
        },
        subject :{
            type : String
        },
        message :{
            type: String
        }
    }
);

const Message = mongoose.model("Message",messageSchema);
 export default Message;
