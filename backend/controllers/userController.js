
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function createUser(req,res){

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
                    userName: user.name,
                    email: user.email,
                    role: user.role,
                    image: user.img
                },
                 "ram123",
            )
            res.json({ message: "Login successful",
                token: token
             });
        } else {
            res.status(401).json({ message: "Invalid password" });
        }
    
    }
    }).catch((err) => {       
         res.status(500).json({ message: "Error logging in", error: err });
    })
};
