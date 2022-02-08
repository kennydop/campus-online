import User from "../models/User.js";
import Post from "../models/Post.js";
import cloudinary from "../utils/cloudinary.js";
import College from "../models/College.js";
import Notification from "../models/Notification.js";
import Chat from "../models/Chat.js";

const bgColors = ["000D6B", "125C13", "3E065F", "082032", "FF414D"]

// update user info
export const updateUserInfo = async (req, res) => {
  var newPP = ''
  var info = {}
  try {
    const user = await User.findById(req.params.id)
    if(req.body.college){
      if(user.college){
        await College.findOneAndUpdate({name: user.college}, {$inc: {users: -1}}, {new: true})
      }
      await College.findOneAndUpdate({name: req.body.college}, {$inc: {users: 1}}, {new: true})
    }

    if(req.body.coverPicture){
      const uploadResponse = await cloudinary.uploader.upload(req.body.coverPicture, {
        upload_preset: 'co_coverpics', resource_type: "image"
      });
      if(user.coverPicture){
        await cloudinary.uploader.destroy(user.coverPicture.split("upload/")[1].split('.')[0]);
      }
      newPP = "https://res.cloudinary.com/kennydop/image/upload/"+uploadResponse.public_id+"."+uploadResponse.format
      const {coverPicture, ...other} = req.body
      info = {...other, coverPicture: newPP}
    }else if(req.body.profilePicture && !req.body.profilePicture.startsWith("https://ui-avatars.com/api/?name=")){
      const uploadResponse = await cloudinary.uploader.upload(req.body.profilePicture, {
        upload_preset: 'co_profilepics', resource_type: "image"
      });
      if(user.profilePicture && user.profilePicture.startsWith("https://res.cloudinary.com/kennydop/image")){
        await cloudinary.uploader.destroy(user.profilePicture.split("w_200/")[1].split('.')[0]);
      }
      newPP = "https://res.cloudinary.com/kennydop/image/upload/ar_1:1,c_fill,g_auto:faces,w_200/"+uploadResponse.public_id+"."+uploadResponse.format
      const {profilePicture, ...other} = req.body
      info = {...other, profilePicture: newPP}
    }else if(req.body.name && !req.body.profilePicture){
      if(user.profilePicture.startsWith("https://ui-avatars.com/api/?name=")){
        newPP = `https://ui-avatars.com/api/?name=${encodeURIComponent((req.body.name))}&background=${bgColors[Math.floor(Math.random() * bgColors.length)]}&color=ffff`
        info = {...req.body, profilePicture: newPP}
      }
    }else{
      if(req.body.removePP){
        if(user.profilePicture && user.profilePicture.startsWith("https://res.cloudinary.com/kennydop/image")){
          await cloudinary.uploader.destroy(user.profilePicture.split("w_200/")[1].split('.')[0]);
        }
        newPP = `https://ui-avatars.com/api/?name=${encodeURIComponent((user.name))}&background=${bgColors[Math.floor(Math.random() * bgColors.length)]}&color=ffff`
        info = {profilePicture: newPP}
      }else if(req.body.removeCP){
        await cloudinary.uploader.destroy(user.coverPicture.split("upload/")[1].split('.')[0]);
        info = {coverPicture: ""}
      }else{
        info = req.body
      }
    }
    await User.findByIdAndUpdate(req.params.id, {$set: info});
    const newUser = await User.findById(req.params.id)
    const userToSend = { _id: newUser._id, username: newUser.username, name: newUser.name, email: newUser.email, college: newUser.college, profilePicture: newUser.profilePicture, preferences: newUser.preferences }
    res.status(200).json(userToSend);
  } catch (error) {
    console.log(error)
    return res.status(500).json(error);
  }
}

// delete a user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    await User.updateMany({followers: req.params.id}, 
      { $pull: { followers: req.params.id } }, 
      { multi: true })
    await User.updateMany({followings: req.params.id}, 
      { $pull: { followers: req.params.id } }, 
      { multi: true })
    await Post.updateMany({likes: req.params.id}, 
      { $pull: { likes: req.params.id } }, 
      { multi: true })
    await Post.updateMany({"comments.authorId": req.params.id},
      { $pull: { comments: {authorId: req.params.id }} }, 
      { multi: true })
    await Notification.deleteOne({userId: req.params.id})
    await Chat.deleteOne({members: req.params.id})
    user.college && await College.findOneAndUpdate({name: user.college}, {$inc: {users: -1}}, {new: true})
    // await Story.findOneAndDelete({userId: req.params.id})
    await Post.deleteMany({authorId: req.params.id})
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("Account has been deleted");
  } catch (error) {
    console.log(error)
    return res.status(500).json(error);
  }
}

// get a user
export const getAUser = async (req, res) => {
  try {
    var user;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      user = await User.findById(req.params.id);
    }else{
      user = await User.findOne({username: req.params.id});
    }
    if(req.query.currentUser){
      const following = await user?.followers.includes(req.query.currentUser)
      const {refreshToken, updatedAt, __v, ...other} = user?._doc
      const uts = {...other, isfollowing: following}
      res.status(200).json(uts)
    }else{
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error)
  }
}

// follow a user
export const handleFollow = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        //follow
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        //unfollow
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      }
    } catch (error) {
        res.status(500).json(error);
    }
  } else {
      res.status(403).json("you cant follow yourself");
  }
}
// check if following a user
export const checkFollow = async (req, res) => {
  try {
    const user = User.find({username: req.body.currentUser})
    if(user.followings.includes(req.body.userToCheck)){
      res.status(200).json("you are already following this user")
    }else{
      res.status(200).json("you are not following this user")
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

//get suggested to follows
export const getFollowSuggestions = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const matches = await User.find( {$and: [
          {college: user.college},
          {_id: {$ne: req.params.id}},
          {followers: {$ne: req.params.id}}
        ]});
        if(matches.length <= 5){
          const usernames = []
          matches.forEach(match=>{
            usernames.push(match.username)
          })
          const _matches = await User.find( {$and: [{followers: {$ne: req.params.id}}, {_id: {$ne: req.params.id}}, {username: {$nin: usernames}}]});
          res.status(200).json(matches.concat(_matches))
        }else{
          res.status(200).json(matches)
        }
    }catch(error){
      res.status(500).json(error);
      console.log(error);
    }
}
//not logged in suggestions
export const getNotLoggedInFollowSuggestions = async (req, res) => {
    try{
        const matches = await User.find();
        res.status(200).json(matches);
    }catch(error){
        res.status(500).json(error);
        console.log(error);
    }
}

//search user
export const searchUser = async (req, res) => {
  try{
    const matches = await User.find({$or: [ { username: { $regex : req.query.search, $options: "i"} }, { name: { $regex : req.query.search, $options: "i"} }]})
    res.status(200).json(matches);
  }catch(error){
    console.log(error);
    res.status(500).json(error);
  }
}
