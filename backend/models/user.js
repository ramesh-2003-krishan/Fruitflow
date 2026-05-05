import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name : 
        {
            type: String,
            required: true
        },
        email :
        {
            type: String,
            required: true,
            unique: true
        },
        password :
        {
            type: String,
            required: true,
        },
        role :
        {
            type: String,
            required: true,
            default: "customer"
        },
        isBlocked :
        {
            type: Boolean,
            required: true,
            default: false
        },
        img :
        {
            type: String,
            required: false,
            default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        }
    }
);
const User = mongoose.model("Users", userSchema);

export default User;
