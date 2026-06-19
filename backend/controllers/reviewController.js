import Review from "../models/review.js";
import Order from "../models/order.js";
import { isAdmin } from "./userController.js";
import User from "../models/user.js";
import Product from "../models/product.js";


export async function createReview(req, res) {
    if (req.user == null){
        res.status(403).json({
            "message" : "you must be logged in to create reviews"
        });
        return;
    }

    const userOrder = await Order.find({
       email: req.user.email
    });
   
    if(userOrder.length == 0){
        res.status(403).json({
            "message" : "you must have made an order to review products"
        });
        return;
    }


    try{
        const existingReview = await Review.findOne({
            user: req.user.id,
            product: req.body.product

        });
        if(existingReview){
            res.status(400).json({
                "message" : "you have already reviewed this product"
            });
            return; 
        }
        const review =  new Review({
            user: req.user.id,
            product: req.body.product,
            rating: req.body.rating,
            comment: req.body.comment
        });
        await review.save();

         await review.populate("user", "name email")
         await review.populate("product", "name productID")

        res.status(201).json({
            "message" : "review created successfully"
        });
    }catch(error){
        res.status(500).json({
            "message" : "an error occurred while creating the review",
            "error": error.message
        });
    }

}


export async function getReviews(req, res) {
    try {
        const reviews = await Review.find()
            .populate({
                path: "user",
                select: "name email",
                strictPopulate: false  
            })
            .populate({
                path: "product",
                select: "name productID",
                strictPopulate: false  
            })
            .sort({ createdAt: -1 })
        res.json(reviews)
    } catch (err) {
    console.error(err)

    res.status(500).json({
        message: err.message,
        stack: err.stack
    })
}
}

export async function deleteReview(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({
            message: "only admin can delete reviews"
        })
    }

    try {
        await Review.findByIdAndDelete(req.params.reviewID)
        res.json({ message: "Review deleted" })
    } catch (err) {
         console.log("Error deleting review:", err)
        res.status(500).json({ message: "Error deleting review" })
    }
}