import {Router} from "express";
import { createNewComment, createNewPost, deleteComment, deletePost, getAPost, getFeedPosts, getGlobalPosts, getUserPosts, handlePostLike, pollVote, trending, trendingPosts, updatePost } from "../controllers/postsControllers.js";
import { verifyUser } from "../authStrategies/authenticate.js";

const router = Router();

//create a post
router.post("/", createNewPost);

//trending
router.get("/trending", trending);
router.get("/trendingposts", trendingPosts);

//update a post
router.put("/:id", updatePost);

//delete a post
router.delete("/:id", verifyUser, deletePost);

// get global posts
router.get("/global", getGlobalPosts);

//get feed posts
router.get("/home/:id", getFeedPosts);

//get a post
router.get("/:id", getAPost);

// get user posts
router.get("/user/:id", getUserPosts);

//like / dislike a post
router.put("/:id/like", handlePostLike);

// comment on a post
router.put("/:id/comment", createNewComment)

// delete comment
router.delete("/:id/comment", verifyUser, deleteComment)

//poll vote
router.put("/:id/vote", pollVote)

export default router;
