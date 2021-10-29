import {Router} from "express";
import { deleteUser, getAUser, handleFollow, updateUserInfo, getFollowSuggestions } from "../controllers/usersControllers.js";

const router = Router();

//update user
router.put("/:id", updateUserInfo);

//delete user
router.delete("/:id", deleteUser);

//get a user
router.get("/:id", getAUser);

//follow a user
router.put("/:id/follow", handleFollow);

//get follow suggestions
router.get("/:id/suggestions", getFollowSuggestions);

export default router;
