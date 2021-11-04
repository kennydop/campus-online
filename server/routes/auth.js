import {Router} from "express";
import { createNewUser, logInUser, resetUserPassword, logInWithProvider } from "../controllers/authControllers.js"
const router = Router();

//REGISTER
router.post("/register", createNewUser);

//LOGIN
router.post("/login", logInUser);
router.post("/login/:provider", logInWithProvider);

//RESET PASWORD
router.post("/resetpassword", resetUserPassword);

export default router;
