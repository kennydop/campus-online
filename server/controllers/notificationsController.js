import Notification from "../models/Notification.js";

export async function getUnreadNotifications(req, res){
  try{
    const notificationBatch = await Notification.findOne({userId: req.params.id});
    console.log("notificationBatch: " + notificationBatch)
    if(notificationBatch){
      console.log(notificationBatch + "is yes")
      var notifications = notificationBatch.notifications
      notifications.filter(n=>n.read === false)
      console.log(notifications)
      res.status(200).json(notifications.length)
    }else{
      res.status(200).json(0)
    }
  }catch(error){
    console.log(error)
    res.send(error)
  }
}

export async function sendNotification(req, res){
  try{
    const unread = await Notification.find({$and:[{members: {$in: [req.params.id]}}, {"messages.message[messages.length-1].read": false}]});
    console.log(unread)
    res.status(200).json(unread.length)
  }catch(error){
    console.log(error)
    res.send(error)
  }
}

export async function getNotifications(req, res){
  try{
    const notificationBatch = await Notification.findOne({userId: req.params.id});
    if(notificationBatch){
      var notifications = notificationBatch.notifications
      notifications.reverse()
      console.log(notifications)
      res.status(200).json(notifications)
    }else{
      res.status(200).json([])
    }
  }catch(error){
    console.log(error)
    res.send(error)
  }
}