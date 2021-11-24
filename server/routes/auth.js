import {Router} from "express";
import { createNewUser, logInUser, logOutUser, resetUserPassword, logInWithProvider, refreshToken, socialsLoginSuccess, socialsLoginFailed } from "../controllers/authControllers.js"
import passport from "passport";
import { verifyUser } from "../authStrategies/authenticate.js";
import User from "../models/User.js";

const router = Router();

//REGISTER
router.post("/register", createNewUser);

//LOGIN
//local
router.post("/login", passport.authenticate("local"), logInUser);

//google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", 
  {
    session: false,
    failureRedirect: "/login/failed"
  }
), socialsLoginSuccess)

//facebook
router.get("/facebook", passport.authenticate("facebook"));
router.get("/facebook/callback", passport.authenticate("facebook", 
  {
    session: false,
    failureRedirect: "/login/failed"
  }
), socialsLoginSuccess);

//twitter
router.get("/twitter", passport.authenticate("twitter"));
router.get("/twitter/callback", passport.authenticate("twitter", 
  {
    session: false,
    failureRedirect: "/login/failed"
  }
), socialsLoginSuccess);

router.get("/login/success", socialsLoginSuccess);
router.get("/login/failed", socialsLoginFailed);

//RESET PASWORD
router.put("/resetpassword/:id", verifyUser, resetUserPassword);

//REFRESH TOKEN
router.put("/refreshtoken", refreshToken)

//LOGOUT USER
router.get("/logout", verifyUser, logOutUser)
export default router;
