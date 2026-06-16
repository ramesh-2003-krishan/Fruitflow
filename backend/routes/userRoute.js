import express from 'express';
import { createUser, getUsers, loginUser, searchUser } from '../controllers/userController.js';


const userRouter = express.Router();

userRouter.post("/",createUser);
userRouter.post("/login",loginUser);
userRouter.get("/search", searchUser);
userRouter.get("/",getUsers);

export default userRouter;