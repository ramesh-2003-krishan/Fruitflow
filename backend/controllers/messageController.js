import Message from "../models/message.js";

export async function saveMessage(req, res){
   if(req.user == null){
    res.status(404).json(
        {
            "message": "first loggin as a user"
        }
    );
   }

   const message = new Message(
    req.body
   );
   message.save().then(()=>{
    res.json({
        message: "message send"
    }).catch((err)=>{
        res.json({
            message: "Error sending message", error: err
        })
    })
   })
}