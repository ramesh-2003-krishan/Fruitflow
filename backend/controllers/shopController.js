import Shop from "../models/shop.js";
import { isAdmin } from "./userController.js";

export default function createShop(req, res){
    if(!isAdmin(req)){
        res.status(401).json(
            {
                "message": "only admins can add shops"
            }
        );
    }
    
    const shop = new Shop(
        req.body
    );
    shop.save().then(()=>{
        res.status(200).json({
            "message":"successfully added shop"
        });
    }).catch((err)=>{
        res.status(401).json({
            "message" : "error creating shop", error:err
        });
    });
}