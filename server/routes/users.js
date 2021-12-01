import {Router} from "express";
import { verifyUser } from "../authStrategies/authenticate.js";
import { deleteUser, getAUser, handleFollow, updateUserInfo, getFollowSuggestions, getNotLoggedInFollowSuggestions, searchUser, checkFollow } from "../controllers/usersControllers.js";

const router = Router();

//get currently signed in user
router.get("/currentUser", verifyUser, (req, res) => {res.send(req.user)})

//update user
router.put("/:id", verifyUser, updateUserInfo);

//delete user
router.delete("/:id", deleteUser);

//get a user
router.get("/:id", getAUser);

//follow a user
router.put("/:id/follow", handleFollow);

//check if following user
router.get("/isfollowing", checkFollow);

//get follow suggestions
router.get("/suggestions/nl", getNotLoggedInFollowSuggestions); //not logged in
router.get("/:id/suggestions", getFollowSuggestions); //logged in 

//search user
router.get("/", searchUser)


export default router;
