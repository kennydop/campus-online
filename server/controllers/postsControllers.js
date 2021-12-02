import Post from "../models/Post.js";
import User from "../models/User.js";
import cloudinary from "../utils/cloudinary.js";

export const createNewPost = async (req, res) => {
  try {
    if(req.body.type !== "text"){
      const uploadResponse = await cloudinary.uploader.upload(req.body.media, {
        upload_preset: 'co_posts', resource_type: "auto"
      });
      const post = {...req.body, media: req.body.type === "image" ? uploadResponse.public_id+"."+uploadResponse.format : uploadResponse.public_id}
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
		await Post.findByIdAndDelete(req.params.id).then(()=>
			res.status(200).json("the post has been deleted")
    )
	} catch (error) {
	res.status(403).json(error);
	}
}

export const handlePostLike = async (req, res) => {
	try {
		var post = await Post.findById(req.params.id);
		if (!post.likes.includes(req.query.userId)) {
			await post.updateOne({ $push: { likes: req.query.userId } });
		} else {
			await post.updateOne({ $pull: { likes: req.query.userId } });
		}
    post = await Post.findById(req.params.id);
    res.status(200).json(post);
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
		// const localPosts = await Post.find({$and: [{college: currentUser.college}, {authorId: {$nin: [...currentUser.followings, currentUser._id]}}]})
		const allPosts = [...userPosts]
    friendPosts.map((posts)=>{
      if (posts.length !== 0){
        posts.map((post)=>{
          allPosts.push(post)
        })
      }
    })
    allPosts.sort((a,b) => (new Date(a.createdAt) < new Date(b.createdAt)) ? 1 : ((new Date(b.createdAt) < new Date(a.createdAt)) ? -1 : 0))
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
    userPosts.sort((a,b) => (new Date(a.updatedAt) < new Date(b.updatedAt)) ? 1 : ((new Date(b.updatedAt) < new Date(a.updatedAt)) ? -1 : 0))
		res.status(200).json(userPosts)
	} catch (error) {
		res.status(500).json(error);
		console.log(error)
	}
}


export const createNewComment = async (req, res) => {
	try{
		var post = await Post.findById(req.params.id)
		await post.updateOne({$push: {comments: req.body}})
		post = await Post.findById(req.params.id)
		res.status(200).json(post)
	}catch(error){
		res.status(500).json(error)
		console.log(error)
	}
}

export const deleteComment = async (req, res) => {
	try{
		var post = await Post.findByIdAndUpdate(req.params.id, {$pull: {comments: {_id: req.query.comment}}})
		post = await Post.findById(req.params.id)
    res.status(200).json(post)
	}catch(error){
		res.status(500).json(error)
		console.log(error)
	}
}

