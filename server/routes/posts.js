import {Router} from "express";
import { createNewPost, deletePost, getAPost, getFeedPosts, getGlobalPosts, getUserPosts, handlePostLike, updatePost } from "../controllers/postsControllers.js";

const router = Router();

//create a post
router.post("/", createNewPost);

//update a post
router.put("/:id", updatePost);

//delete a post
router.delete("/:id", deletePost);

//like / dislike a post
router.put("/:id/like", handlePostLike);

//get a post
router.get("post/:id", getAPost);

//get feed posts
router.get("/home/:id", getFeedPosts);

// get global posts
router.get("/global", getGlobalPosts);

// get user posts
router.get("/user/:id", getUserPosts);

export default router;
