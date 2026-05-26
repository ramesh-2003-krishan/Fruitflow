import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
    {
        paymentId: {
            type: String,
            required: true,
            unique: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        order: {
            type: String,
            ref: "Order",
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        method: {
            type: String,
            required: true,
            enum: ["online", "cashOnDelivery", "bank_transfer"]
        },
        status: {
            type: String,
            required: true,
            enum: ["pending", "completed", "failed"]
        },
        paidAt: {
            type: Date
        }
    },
    {timestamps: true}
)

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;