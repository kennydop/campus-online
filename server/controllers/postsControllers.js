import Post from "../models/Post.js";
import User from "../models/User.js";


export const createNewPost = async (req, res) => {
	const newPost = new Post(req.body);
	try {
		const savedPost = await newPost.save();
		res.status(200).json(savedPost);
	} catch (error) {
		res.status(500).json(error);
	}
}

export const updatePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (post.userId === req.body.userId) {
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
		if (post.userId === req.body.userId) {
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
		if (!post.likes.includes(req.body.userId)) {
			await post.updateOne({ $push: { likes: req.body.userId } });
			post = await Post.findById(req.params.id);
			const newNumOfLikes = await post.likes
			res.status(200).json(newNumOfLikes);
		} else {
			await post.updateOne({ $pull: { likes: req.body.userId } });
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
		const userPosts = await Post.find({ userId: currentUser._id });
		const friendPosts = await Promise.all(
			currentUser.followings.map((friendId) => {
				return Post.find({ userId: friendId });
			})
		);
		const localPosts = await Post.find({college: currentUser.college})
		var allPosts = [...userPosts, ...friendPosts, ...localPosts];
		res.json(allPosts)
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
		const userPosts = await Post.find({ userId: req.params.id });
		res.json(userPosts)
		console.log(userPosts)
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

