import {Router} from "express";
import { createNewUser, logInUser, logOutUser, refreshToken, socialsLoginSuccess, socialsLoginFailed, forgotPassword, changeUserPassword, resetPassword, validatePasswordReset } from "../controllers/authControllers.js"
import passport from "passport";
import { verifyUser } from "../authStrategies/authenticate.js";

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
router.put("/changepassword/:id", verifyUser, changeUserPassword);

router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword/:id", resetPassword);
router.get("/validate-password-reset/:id/:token", validatePasswordReset);


//REFRESH TOKEN
router.put("/refreshtoken", refreshToken)

//LOGOUT USER
router.get("/logout", verifyUser, logOutUser)
export default router;
