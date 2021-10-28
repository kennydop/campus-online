import {Router} from "express";
import { createNewUser, logInUser, resetUserPassword } from "../controllers/authControllers.js"
const router = Router();

//REGISTER
router.post("/register", createNewUser);

//LOGIN
router.post("/login", logInUser);

//RESET PASWORD
router.post("/resetpassword", resetUserPassword);

export default router;
