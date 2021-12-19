import {Router} from "express";
import { sendMessage, getMessages, getChats } from "../controllers/chatsControllers.js"

const router = Router();

router.post("/", sendMessage);

router.get("/messages/:id", getMessages);

router.get("/:id", getChats);

// router.put("/:id", getChats);

export default router;
