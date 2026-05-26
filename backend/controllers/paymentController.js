import Payment from '../models/payment.js';

export async function createPayment(req, res) {
    if (req.user == null){
        res.status(403).json({
            "message" : "you must be logged in to create payments"
        });
        return;
    }
    
    try{
        const {order, amount, method} = req.body;

        const validMethods = ["online", "cashOnDelivery", "bank_transfer"];
        if(!validMethods.includes(method)){
            res.status(400).json({
                "message" : "invalid payment method"
            });
            return;
        }

        const paymentId = "pay_" + Date.now();

        const newPayment = new Payment({
            paymentId: paymentId,
            user: req.user.id,
            order: order,
            amount: amount, 
            method: method,
            status: "pending"
        });
        await newPayment.save();

        res.status(201).json({
            "message" : "payment created successfully",
            "payment": newPayment
        });
    }catch(error){
        res.status(500).json({
            "message" : "an error occurred while creating the payment",
            "error": error.message
        });
    }
}