import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';




const app = express();

app.use(bodyParser.json());

mongoose.connect("mongodb://admin:1234@ac-x9fmtkt-shard-00-00.x921pmo.mongodb.net:27017,ac-x9fmtkt-shard-00-01.x921pmo.mongodb.net:27017,ac-x9fmtkt-shard-00-02.x921pmo.mongodb.net:27017/?ssl=true&replicaSet=atlas-a8z84j-shard-0&authSource=admin&appName=Cluster0").then(() => {
    console.log("Connected to MongoDB");
});



app.get("/", (req, res) => {
    res.send("This is a get request");
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});