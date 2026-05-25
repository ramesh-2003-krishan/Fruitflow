import express from 'express';
import { createUser, loginUser, searchUser } from '../controllers/userController.js';


const userRouter = express.Router();

userRouter.post("/",createUser);
userRouter.post("/login",loginUser);
userRouter.get("/search", searchUser);

export default userRouter;