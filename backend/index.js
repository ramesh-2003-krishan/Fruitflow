import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Student from './models/student.js';
import studentRouter from './routes/studentRoute.js';
import productRouter from './routes/productRoute.js';
import userRouter from './routes/userRoute.js';



const app = express();

app.use(bodyParser.json());

mongoose.connect("mongodb://admin:1234@ac-x9fmtkt-shard-00-00.x921pmo.mongodb.net:27017,ac-x9fmtkt-shard-00-01.x921pmo.mongodb.net:27017,ac-x9fmtkt-shard-00-02.x921pmo.mongodb.net:27017/?ssl=true&replicaSet=atlas-a8z84j-shard-0&authSource=admin&appName=Cluster0").then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB", err);
});




app.use("/students", studentRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});