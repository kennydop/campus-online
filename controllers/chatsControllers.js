import Chat from "../models/Chat.js";

export async function sendMessage(req, res){
  try{
    if(req.body.chatId !== null){
      const chat = await Chat.findById(req.body.chatId)
      chat.messages.push({ from: req.body.from, message: req.body.message })
      chat.save((error, chat)=>{
        if(error){
          console.log(error)
        }else{
          res.status(200).json(chat.messages[chat.messages.length - 1])
        }
      })
    }else{
      const exists = await Chat.findOne({members: {$all: [req.body.from, req.body.to]}})
      if(!exists){
        const chat = new Chat({
          members: [req.body.from, req.body.to],
          messages: {
            from: req.body.from,
            message: req.body.message
          }
        })
        chat.save((error, chat)=>{
          if(error){
            console.log(error)
          }else{
            res.status(200).json(chat)
          }
        })
      }
    }
  }catch(error){
    console.log(error)
    res.send(error)
  }
}

export async function getMessages(req, res){
  try{
    const chat = await Chat.findById(req.params.id);
    console.log(chat)
    res.status(200).json(chat.messages)
  }catch(error){
    console.log(error)
    res.send(error)
  }
}

export async function getChats(req, res){
  try{
    const chats = await Chat.find({members: {$in: [req.params.id]}}).sort({updatedAt: -1});
    res.status(200).json(chats)
  }catch(error){
    console.log(error)
    res.send(error)
  }
}

export async function getChat(req, res){
  try{
    console.log(":::::::::::::", req.query.user, req.query.reciever)
    const chats = await Chat.findOne({members: {$in: [req.query.user, req.query.reciever ]}});
    res.status(200).json(chats)
  }catch(error){
    console.log(error)
    res.send(error)
  }
}

export async function getUnreadChats(req, res){
  try{
    const chats = await Chat.find({members: {$in: [req.params.id]}});
    const unreadChats = chats.filter(c=>c.messages[c.messages.length-1].read === false)
    const unread = []
    unreadChats.forEach((c)=>{
      unread.push(c.members.find(m=>m!==req.params.id))
    })
    res.status(200).json(unread)
  }catch(error){
    console.log(error)
    res.send(error)
  }
}