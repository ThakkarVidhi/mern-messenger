import { Request, Response } from 'express';
import Message from "../models/messageModel";

export async function addMessage(req: Request, res: Response) {
    const { text, image, audio, senderId, receiverId } = req.body;
    console.log("req.body ", req.body)
  
    try {
      const chat = await Message.create({ text, image, audio, senderId, receiverId });
      console.log("chat ", chat)

      res.status(200).json(chat);
    } catch (error) {
      res.status(400).json({ error:( error as Error).message });
    }
}
  
export async function getMessages(req: Request, res: Response ) {
    const { senderId, receiverId } = req.params;
    console.log("req.params ", req.params)

    /*
    @params
    const page = (req.query.chats || 0) as number;
    const chatsPerFetch = 10; */

    try {
        const chats = await Message.find({
            $and: [
                {
                $or: [{ senderId: senderId }, { receiverId: senderId }],
                },
                {
                $or: [{ receiverId: receiverId }, { senderId: receiverId }],
                },
            ],
        }).sort({createdAt: 1});
        console.log("chats ", chats)

        res.status(200).json(chats);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}


export async function getLastMessage(req: Request | any, res: Response) {
    const { senderId, receiverId } = req.params;
    console.log("req.params ", req.params)

    const uId = req.user._id;
    console.log("req.user ", req.user)

    try {
        const chats = await Message.findOne({
            $and: [
                {
                $or: [{ senderId: senderId }, { receiverId: senderId }],
                },
                {
                $or: [{ receiverId: receiverId }, { senderId: receiverId }],
                },
            ],
        }).sort({createdAt: -1}).select("text image audio").where("senderId").ne(uId);
        console.log("chats ", chats)


        if (chats?.text === ""  || chats?.image || chats?.audio) {
            return res.status(200).json({text: "media-alt-send"})
        }

        
        res.status(200).json(chats);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}