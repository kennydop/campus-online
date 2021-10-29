import {Router} from "express";
import { createNewComment, createNewPost, deleteComment, deletePost, getAllComments, getAPost, getFeedPosts, getGlobalPosts, getUserPosts, handlePostLike, updatePost } from "../controllers/postsControllers.js";

const router = Router();

//create a post
router.post("/", createNewPost);

//update a post
router.put("/:id", updatePost);

//delete a post
router.delete("/:id", deletePost);

//get a post
router.get("post/:id", getAPost);

//get feed posts
router.get("/home/:id", getFeedPosts);

// get global posts
router.get("/global", getGlobalPosts);

// get user posts
router.get("/user/:id", getUserPosts);

//like / dislike a post
router.put("/:id/like", handlePostLike);

// comment on a post
router.put("/:id/comment", createNewComment)

// get all comments
router.get("/:id/comments", getAllComments)

// delete comment
router.delete("/:id/comment", deleteComment)

export default router;
