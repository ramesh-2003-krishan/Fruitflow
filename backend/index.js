import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { applySecurity } from './config/security.js';
import dotenv from 'dotenv';
import User from './models/user.js';
import order from './models/order.js';
import productRouter from './routes/productRoute.js';
import userRouter from './routes/userRoute.js';
import jwt from "jsonwebtoken";
import orderRouter from './routes/orderRoute.js';
import reviewRouter from './routes/reviewRoute.js';
import paymentRouter from './routes/paymentRoute.js';
import messageRouter from './routes/messageRoute.js';
import shopRouter from './routes/shopRoute.js';


dotenv.config();

const app = express();

applySecurity(app);

app.use(bodyParser.json());



app.use((req, res, next) => {

    const tokenString = req.header("Authorization");

    if (tokenString != null) {

        const token = tokenString.replace("Bearer ", "");

        console.log(token);

        jwt.verify(token, "ram123", (err, decoded) => {

            if (decoded != null) {
                req.user = decoded;
                next();

            } else {
                res.status(403).json({
                    message: "invalid token"
                });
                
            }
        });

    } else {
        next();
    }
});



mongoose.connect("mongodb://admin:1234@ac-x9fmtkt-shard-00-00.x921pmo.mongodb.net:27017,ac-x9fmtkt-shard-00-01.x921pmo.mongodb.net:27017,ac-x9fmtkt-shard-00-02.x921pmo.mongodb.net:27017/?ssl=true&replicaSet=atlas-a8z84j-shard-0&authSource=admin&appName=Cluster0").then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB", err);
});





app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/messages", messageRouter);
app.use("/api/shops", shopRouter);

const port = process.env.PORT || 3000;

if (!process.env.VERCEL) {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

export default app;