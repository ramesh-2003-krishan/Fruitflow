import express from 'express';
import { blockUser, createUser, deleteUser, getUsers, loginUser, makeUserAdmin, searchUser, unblockUser } from '../controllers/userController.js';


const userRouter = express.Router();

userRouter.post("/",createUser);
userRouter.post("/login",loginUser);
userRouter.get("/search", searchUser);
userRouter.get("/",getUsers);
userRouter.delete("/:id",deleteUser);
userRouter.put("/:id/block", blockUser);
userRouter.put("/:id/unblock", unblockUser);
userRouter.put("/:id/make-admin", makeUserAdmin);

export default userRouter;