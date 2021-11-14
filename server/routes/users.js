import {Router} from "express";
import { verifyUser } from "../authStrategies/authenticate.js";
import { refreshToken } from "../controllers/authControllers.js";
import { deleteUser, getAUser, handleFollow, updateUserInfo, getFollowSuggestions, searchUser } from "../controllers/usersControllers.js";

const router = Router();

//get currently signed in user
router.get("/currentUser/me", verifyUser, (req, res) => {res.send(req.user)})

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

//search user
router.get("/", searchUser)

export default router;
