import User from "../models/User.js";
import Post from "../models/Post.js";
import cloudinary from "../utils/cloudinary.js";

const bgColors = ["000D6B", "125C13", "3E065F", "082032", "FF414D"]

// update user info
export const updateUserInfo = async (req, res) => {
  try {
    const newPP = ''
    if(req.body.name && !req.body.profilePicture){
      const user = await User.findById(req.params.id)
      if(user.profilePicture.startsWith("https://ui-avatars.com/api/?name=")){
        newPP = `https://ui-avatars.com/api/?name=${encodeURIComponent((req.body.name))}&background=${bgColors[Math.floor(Math.random() * bgColors.length)]}&color=ffff`
        const info = {...req.body, profilePicture: newPP}
        const newUser = await User.findByIdAndUpdate(req.params.id, {$set: info});
        res.status(200).json(newUser);
      }
    }
    else{
      if(req.body.profilePicture){
        const uploadResponse = await cloudinary.uploader.upload(req.body.profilePicture, {
          upload_preset: 'co_profilepics', resource_type: "image"
        });
        const {profilePicture, ...other} = req.body
        other.profilePicture = "https://res.cloudinary.com/kennydop/image/upload/ar_1:1,c_fill,g_auto:faces,r_max,w_100/campus-online/profile-pictures/"+uploadResponse.public_id+"."+uploadResponse.format
        const newUser = await User.findByIdAndUpdate(req.params.id, {$set: other});
        res.status(200).json(newUser);
      }
      const newUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body});
      res.status(200).json(newUser);
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json(error);
  }
}

// delete a user
export const deleteUser = async (req, res) => {
  try {
    await User.updateMany({followers: req.params.id}, 
      { $pull: { followers: req.params.id } }, 
      { multi: true })
    await Post.updateMany({likes: req.params.id}, 
      { $pull: { likes: req.params.id } }, 
      { multi: true })
    await Post.updateMany({"comments.userId": req.params.id}, 
      { $pull: { comments: {userId: req.params.id }} }, 
      { multi: true })
    // await Story.findOneAndDelete({userId: req.params.id})
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
        var user = await User.findOne({username: req.params.id});
        if (!user){
          user = await User.findById(req.params.id)
        }
        if(req.query.currentUser){
          console.log(req.query.currentUser)
          const following = await user.followers.includes(req.query.currentUser)
          const {refreshToken, updatedAt, __v, ...other} = user._doc
          const uts = {...other, isfollowing: following}
          res.status(200).json(uts)
        }else{
          res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json(error);
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
            {$or: [{from: { $regex : user.from ? user.from.split(',')[0] : '_', $options: "i"}}, {city: { $regex : user.city ? user.city.split(',')[0] : '_', $options: "i"}}, {from: { $regex : user.city ? user.city.split(',')[0] : '_', $options: "i"}}, {city: { $regex : user.from ? user.from.split(',')[0] : '_', $options: "i"}},{college: user.college}]},
            {_id: {$ne: req.params.id}},
            {followers: {$ne: req.params.id}}
        ]});
        if(matches.length <= 5){
          const usernames = []
          matches.forEach(match=>{
            usernames.push(match.username)
          })
          const _matches = await User.find( {$and: [{followers: {$ne: req.params.id}}, {_id: {$ne: req.params.id}}, {username: {$nin: usernames}}]});
          matches.concat(_matches);
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
        const matches = await User.find({ username: { $regex : req.query.search, $options: "i"} });
        res.status(200).json(matches);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}


//unfollow a user

// router.put("/:id/unfollow", async (req, res) => {
//     if (req.body.userId !== req.params.id) {
//       try {
//         const user = await User.findById(req.params.id);
//         const currentUser = await User.findById(req.body.userId);
//         if (user.followers.includes(req.body.userId)) {
//           await user.updateOne({ $pull: { followers: req.body.userId } });
//           await currentUser.updateOne({ $pull: { followings: req.params.id } });
//           res.status(200).json("user has been unfollowed");
//         } else {
//           res.status(403).json("you dont follow this user");
//         }
//       } catch (error) {
//         res.status(500).json(error);
//       }
//     } else {
//       res.status(403).json("you cant unfollow yourself");
//     }
//   });