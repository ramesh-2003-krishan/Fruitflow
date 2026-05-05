
import User from '../models/user.js';

export function createUser(req,res){
    const user = new User(
        {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            isBlocked: req.body.isBlocked,
            img: req.body.img
        }
    );
    user.save().then(()=> {
            res.json({ message: "User created successfully" });
        }).catch((err) => {
            res.json({ message: "Error creating user", error: err });
        }
)};