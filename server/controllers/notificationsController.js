import Notification from "../models/Notification.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

export async function createNotification(data){
  const user = await User.findById(data.from)
  try{
    switch (data.type){
      case "postLike":
        postLikeHandler(data)
        break;
      case "postComment":
        postCommentHandler(data)
        break;
      case "pollVote":
        pollVoteHandler(data)
        break;
      case "follow":
        followHandler(data, "follow")
        break;
      case "unfollow":
        followHandler(data, "unfollow")
        break; 
      default:
        console.log(data.type)
        break;
    }
  }catch(error){
    console.log(error)
  }
}

export async function readNotifications(id){
  var notificationBatch = await Notification.findOne({userId: id})
  try{
    notificationBatch.notifications.forEach(notification => {
      if(notification.read === false){
        notification.read = true
      }
    })
    notificationBatch.save((error, data)=>{
      if(error){
        console.log(error)
      }
    })
  }catch(error){
    console.log(error)
  }
}

export async function getUnreadNotifications(req, res){
  try{
    const notificationBatch = await Notification.findOne({userId: req.params.id});
    if(notificationBatch){
      var notifications = notificationBatch.notifications.filter(n=>n.read === false)
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
      res.status(200).json(notifications)
    }else{
      res.status(200).json([])
    }
  }catch(error){
    console.log(error)
    res.send(error)
  }
}

const postLikeHandler = async (data) => {
  const post = await Post.findById(data.post)
  var exists = await Notification.findOne({userId: data.to})
  const noti = {
    userId: data.to,
    notifications: {
      message: `${post.likes.length > 2 ? " and " + (post.likes.length-1) + " others" : ""} liked your ${post.type === "image" ? "picture" : post.type === "product" ? "ad": post.type} "${post.description.slice(0, 30)}"`,
      thumbnail: post.media && (post.type !== "video" ? `https://res.cloudinary.com/kennydop/image/upload/w_100,q_auto/${post.media}` : `https://res.cloudinary.com/kennydop/video/upload/c_scale,w_100/${post.media}`),
      from: data.from,
      type: data.type,
      post: data.post,
      read: false,
    }
  }

  if(exists){
    exists.notifications.push(noti.notifications)
    exists.save()
  }else{
    exists = await new Notification(noti)
    console.log(exists)
    exists.save()
  }
}

const postCommentHandler = async (data) => {
  const post = await Post.findById(data.post)
  var exists = await Notification.findOne({userId: data.to})
  const noti = {
    userId: data.to,
    notifications: {
      message: `${post.comments.length > 2 ? " and " + (post.comments.length-1) + " others" : ""} commented on your ${post.type === "image" ? "picture" : post.type === "product" ? "ad": post.type} "${post.description.slice(0, 30)}": ${data.comment.slice(0, 20)}`,
      thumbnail: post.media && (post.type !== "video" ? `https://res.cloudinary.com/kennydop/image/upload/w_100,q_auto/${post.media}` : `https://res.cloudinary.com/kennydop/video/upload/c_scale,w_100/${post.media}`),
      from: data.from,
      type: data.type,
      post: data.post,
      read: false,
    }
  }
  if(exists){
    exists.notifications.push(noti.notifications)
    exists.save()
  }else{
    exists = await new Notification(noti)
    exists.save()
  }
  
}

const pollVoteHandler = async (data) => {
  const post = await Post.findById(data.post)
  var exists = await Notification.findOne({userId: data.to})
  const noti = {
    userId: data.to,
    notifications: {
      message: `${post.poll.votes.length > 2 ? " and " + (post.poll.votes.length-1) + " others" : ""} voted in your poll "${post.description.slice(0, 30)}"`,
      thumbnail: post.media && `https://res.cloudinary.com/kennydop/image/upload/w_100,q_auto/${post.media}`,
      from: data.from,
      type: data.type,
      read: false,
    }
  }
  if(exists){
    exists.notifications.push(noti.notifications)
    exists.save()
  }else{
    exists = await new Notification(noti)
    exists.save()
  }
  
}

const followHandler = async (data, type) => {
  var exists = await Notification.findOne({userId: data.to})
  const user = await User.findById(data.from)

  const noti = {
    userId: data.to,
    notifications: {
      message: type === "follow" ? `followed you` : `unfollowed you`,
      thumbnail: user.profilePicture,
      from: data.from,
      type: data.type,
      read: false,
    }
  }
  if(exists){
    exists.notifications.push(noti.notifications)
    exists.save()
  }else{
    exists = await new Notification(noti)
    exists.save()
  }
  
}