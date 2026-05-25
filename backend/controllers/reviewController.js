import Review from "../models/review.js";
import Order from "../models/order.js";


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