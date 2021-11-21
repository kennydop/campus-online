import {Router} from "express";
import { createNewUser, logInUser, logOutUser, resetUserPassword, logInWithProvider, refreshToken } from "../controllers/authControllers.js"
import passport from "passport";
import { verifyUser } from "../authStrategies/authenticate.js";

const router = Router();

//REGISTER
router.post("/register", createNewUser);

//LOGIN
router.post("/login", passport.authenticate("local"), logInUser);
router.post("/login/:provider", logInWithProvider);

//RESET PASWORD
router.put("/resetpassword/:id", resetUserPassword);

//REFRESH TOKEN
router.put("/refreshtoken", refreshToken)

//LOGOUT USER
router.get("/logout", verifyUser, logOutUser)
export default router;
