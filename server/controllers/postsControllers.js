import Post from "../models/Post.js";
import User from "../models/User.js";
import cloudinary from "../utils/cloudinary.js";

export const createNewPost = async (req, res) => {
  var post = req.body
  try {
    if(post.media){
      const uploadResponse = await cloudinary.uploader.upload(post.media, {
        upload_preset: 'co_posts', resource_type: "auto"
      })
      post.media = post.type !== "image" ? uploadResponse.public_id : uploadResponse.public_id+"."+uploadResponse.format
    }
    if(post.type === "poll"){
      post.poll.expireAt = converToExpiryTime(post.poll.exp)
      delete post.product
    }else if(post.type === "product"){
      delete post.poll
    }else{
      delete post.poll
      delete post.product
    }
    const newPost = new Post(post);
    const savedPost = await newPost.save();
    await User.findByIdAndUpdate(post.authorId, {$inc: {posts: 1}}, {new: true})
    res.status(200).json(savedPost);
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
    const post = await Post.findById(req.params.id)
    await User.findByIdAndUpdate(post.authorId, {$inc: {posts: -1}}, {new: true})
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
		const localPosts = await Post.find({$and: [{college: currentUser.college}, {authorId: {$nin: [...currentUser.followings, currentUser._id]}}]})
		const allPosts = [...userPosts, ...localPosts]
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
		const allPosts = await Post.find({}).sort({ createdAt: -1 });
		res.status(200).json(allPosts)
	} catch (error) {
		res.status(500).json(error);
    console.log(error)
	}
}

export const getUserPosts =  async (req, res) => {
	try {
		const userPosts = await Post.find({ $and: [{authorId: req.params.id }, {isAnonymous: false}]}).sort({ createdAt: -1 })
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


export const trending = async (req, res) => {
  try{
    Post.find({}, {_id: 0, description: 1}).sort({ createdAt: -1 }).limit(1000).exec(function(error, posts) {
    if(error){
      console.log(error)
      res.send(error)
    }else{
      var pool = ""
      const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
      posts.forEach((post)=>{
        const str=post.description
        const temp = str.replace(regex, ' ').replace(/(\r\n|\n|\r)/gm, " ")
        pool = pool + " " + temp.trim()
      })
      let occur = nthMostCommon(pool, 5);
      function nthMostCommon(str, amount) {
        const stickyWords =[ "", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "the", "there", "by", "at", "and", "so", "if", "than", "but", "about", "in", "on", "the", "was", "for", "that", "said", "a", "or", "of", "to", "there", "will", "be", "what", "get", "go", "think", "just", "every", "are", "it", "cos","is", "were", "had", "i", "very"];
          str= str.toLowerCase();
          var splitUp = str.split(/\s/);
          const wordsArray = splitUp.filter(function(x){
            return !stickyWords.includes(x) ;
          });
          var wordOccurrences = {}
          for (var i = 0; i < wordsArray.length; i++) {
              wordOccurrences['_'+wordsArray[i]] = ( wordOccurrences['_'+wordsArray[i]] || 0 ) + 1;
          }
          var result = Object.keys(wordOccurrences).reduce(function(acc, currentKey) {
            /* you may want to include a binary search here */
            for (var i = 0; i < amount; i++) {
              if (!acc[i]) {
                acc[i] = { word: currentKey.slice(1, currentKey.length), occurences: wordOccurrences[currentKey] };
                break;
              } else if (acc[i].occurences < wordOccurrences[currentKey]) {
                  acc.splice(i, 0, { word: currentKey.slice(1, currentKey.length), occurences: wordOccurrences[currentKey] });
                  if (acc.length > amount)
                    acc.pop();
                  break;
              }
            }
            return acc;
          }, []);
          return result;
      }
      res.json(occur)
    }
  });
  }catch(error){
    res.status(404).json(error)
  console.log(error)
  }
}

export const trendingPosts = async (req, res) => {
  try{
    const matches = await Post.find({description: { $regex : req.query.word, $options: "i"}}).sort({ createdAt: -1 }).limit(1000)
    res.status(200).json(matches)
  }catch(error){
    res.status(404).json(error)
  }
}

export const pollVote = async (req, res)=>{
  try{
    var post = await Post.findById(req.params.id)
    const index = post.poll.choices.findIndex(c=>c._id.valueOf() === req.body.id)
    if(index !== -1){
      post.poll.choices[index].votes.push(req.body.user)
      post.poll.votes.push(req.body.user)
    }
    const savedPost = await post.save()
    res.status(200).json(savedPost)
  }catch(error){
    console.log(error)
    res.status(404).json(error)
  }
}

function converToExpiryTime(str){
  const numberOf = parseInt(str.split(' ')[0])
  const time = str.split(' ')[1]
  var expTime = 8.64e+7
  switch (time){
    case "minute(s)":
      expTime = numberOf * 60000
      break
    case "hour(s)":
      expTime = numberOf * 3.6e+6
      break
    case "day(s)":
      expTime = numberOf * 8.64e+7
      break
    default:
      expTime = 1 * 8.64e+7
      break
  }
  return new Date().getTime() + expTime
}
