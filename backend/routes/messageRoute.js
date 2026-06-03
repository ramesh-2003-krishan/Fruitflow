import express from 'express'
import { saveMessage } from '../controllers/messageController.js';


const messageRouter = express.Router();

messageRouter.post("/",saveMessage)

export default messageRouter;