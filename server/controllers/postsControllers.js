import Post from "../models/Post.js";
import User from "../models/User.js";
import cloudinary from "../utils/cloudinary.js";

export const createNewPost = async (req, res) => {
  try {
    if(req.body.type !== "text"){
      const uploadResponse = await cloudinary.uploader.upload(req.body.media, {
        upload_preset: 'co_posts', resource_type: "auto"
      });
      const post = {...req.body, media: uploadResponse.public_id+"."+uploadResponse.format}
      const newPost = new Post(post);
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    }else{
      const newPost = new Post(req.body);
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    }
	} catch (error) {
		res.status(500).json(error);
    console.log(error)
	}
}

export const updatePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (post.authorId === req.body.authorId) {
			await post.updateOne({ $set: req.body });
			res.status(200).json("the post has been updated");
		} else {
			res.status(403).json("you can update only your post");
		}
	} catch (error) {
		res.status(500).json(error);
	}
}

export const deletePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (post.authorId === req.body.authorId) {
			await post.deleteOne();
			res.status(200).json("the post has been deleted");
		} else {
			res.status(403).json("you can't delete this post");
		}
	} catch (error) {
	res.status(500).json(error);
	}
}

export const handlePostLike = async (req, res) => {
	try {
		var post = await Post.findById(req.params.id);
		if (!post.likes.includes(req.body.authorId)) {
			await post.updateOne({ $push: { likes: req.body.authorId } });
			post = await Post.findById(req.params.id);
			const newNumOfLikes = await post.likes
			res.status(200).json(newNumOfLikes);
		} else {
			await post.updateOne({ $pull: { likes: req.body.authorId } });
			res.status(200).json("The post has been disliked");
		}
	} catch (error) {
	res.status(500).json(error);
	}
}

export const getAPost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		res.status(200).json(post);
	} catch (error) {
		res.status(500).json(error);
	}
}

export const getFeedPosts = async (req, res) => {
	try {
		const currentUser = await User.findById(req.params.id);
		const userPosts = await Post.find({ authorId: currentUser._id });
		const friendPosts = await Promise.all(
			currentUser.followings.map((friendId) => {
				return Post.find({ authorId: friendId });
			})
		);
		const localPosts = await Post.find({$and: [{college: currentUser.college}, {authorId: {$nin: [...currentUser.followings, currentUser._id]}}]})
    // userPosts.length !== 0 && allPosts.concat(userPosts)
    // friendPosts.length !== 0 && allPosts.concat(friendPosts)
    // localPosts.length !== 0 && allPosts.concat(localPosts)
		const allPosts = [...userPosts, ...localPosts]
    friendPosts.map((posts)=>{
      if (posts.length !== 0){
        posts.map((post)=>{
          allPosts.push(post)
        })
      }
    })
    allPosts.sort((a,b) => (new Date(a.updatedAt) < new Date(b.updatedAt)) ? 1 : ((new Date(b.updatedAt) < new Date(a.updatedAt)) ? -1 : 0))
		// console.log(":::::::::::::::::::::::::::allPosts", allPosts)
		// console.log(":::::::::::::::::::::::::::userPosts", userPosts)
		// console.log(":::::::::::::::::::::::::::friendPosts", friendPosts)
		// console.log(":::::::::::::::::::::::::::localPosts", localPosts)
    res.status(200).json(allPosts)
	} catch (error) {
		res.status(500).json(error);
		console.log(error)
	}
}

export const getGlobalPosts = async (req, res) => {
	try {
		const allPosts = await Post.find();
		res.json(allPosts)
	} catch (error) {
		res.status(500).json(error);
	}
}

export const getUserPosts =  async (req, res) => {
	try {
		const userPosts = await Post.find({ authorId: req.params.id });
		res.status(200).json(userPosts)
	} catch (error) {
		res.status(500).json(error);
		console.log(error)
	}
}

export const getAllComments = async (req, res) => {
	Post.find()
}

export const createNewComment = async (req, res) => {
	try{
		var post = await Post.findById(req.params.id)
		await post.updateOne({$push: {comments: req.body}})
		post = await Post.findById(req.params.id)
		const newComments = await post.comments
		res.status(200).json(newComments)
	}catch(error){
		res.status(500).json(error)
		console.log(error)
	}
}

export const deleteComment = async (req, res) => {
	try{
		var post = await Post.findById(req.params.id)
		await post.updateOne({$pull: {comments: req.body}})
		post = await Post.findById(req.params.id)
		const newComments = await post.comments
		res.status(200).json(newComments)
	}catch(error){
		res.status(500).json(error)
		console.log(error)
	}
}

