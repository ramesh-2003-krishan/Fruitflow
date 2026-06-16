
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function createUser(req,res){
    if(req.body.role == "admin"){
        if(req.user != null){
            if(req.user.role != "admin"){
                res.status(403).json({
                    "message" : "unauthorized to create admin account as user"
                });
                return;
            }
        }else{
            res.status(403).json({
                "message" : "you dont have a user account, first you have to create a user account and then login to create an admin account"
            });
            return;
        }
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const user = new User(
        {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role
        }
    );
    user.save().then(()=> {
            res.json({ message: "User created successfully" });
        }).catch((err) => {
            res.json({ message: "Error creating user", error: err });
        }
)};



export function loginUser(req,res){
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then((user) => {
        if (user == null) {
             res.status(404).json({ message: "User not found" });
        }
     else {
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (isPasswordValid) {
            const token = jwt.sign(
                { 
                    id: user._id,
                    userName: user.name,
                    email: user.email,
                    role: user.role,
                    image: user.img
                },
                 "ram123",
            )
            res.json({ message: "Login successful",
                token: token,
                role : user.role
             });
        } else {
            res.status(401).json({ message: "Invalid password" });
        }
    
    }
    }).catch((err) => {       
         res.status(500).json({ message: "Error logging in", error: err });
    })
};

export function isAdmin(req){
    if(req.user == null){
        return false;
    }
    if(req.user.role != "admin"){
        return false;
    }
    return true;
}


export async function searchUser(req, res){
    if(!isAdmin(req)){
        res.status(403).json({
            "message" : "only admin can search users"
        });
        return;
    }
    
    try{
       const{name, email, role} = req.query;
       const query = {};
       if(name){
        query.name = { $regex: name, $options: "i" };
       }
       if(email){
        query.email = { $regex: email, $options: "i" };
       }
       if(role){
        query.role = role;
       }
       const users = await User.find(query).select("-password");
       res.status(200).json(users);
    }catch(err){
        res.status(500).json({
            "message" : "an error occurred while searching for users",
            "error": err
        });
    }
}

export async function getUsers(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({
            message: "Only admin can view users"
        });
    }

    try {
        const users = await User.find().select("-password");

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({
            message: "Error fetching users",
            error: err.message
        });
    }
}

export async function deleteUser(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({
            message: "Only admin can delete users"
        });
    }

    try {
        const userId = req.params.id;

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Error deleting user",
            error: err.message
        });
    }
}

export async function blockUser(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({
            message: "Only admin can block users"
        });
    }

    try {
        const userId = req.params.id;

        const user = await User.findByIdAndUpdate(
            userId,
            { isBlocked: true },
            { new: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User blocked successfully",
            user
        });
    } catch (err) {
        res.status(500).json({
            message: "Error blocking user",
            error: err.message
        });
    }
}

export async function unblockUser(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({
            message: "Only admin can unblock users"
        });
    }

    try {
        const userId = req.params.id;

        const user = await User.findByIdAndUpdate(
            userId,
            { isBlocked: false },
            { new: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User unblocked successfully",
            user
        });
    } catch (err) {
        res.status(500).json({
            message: "Error unblocking user",
            error: err.message
        });
    }
}