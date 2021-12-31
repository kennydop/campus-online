import {Router} from "express";
import { sendMessage, getMessages, getChats, getUnreadChats } from "../controllers/chatsControllers.js"

const router = Router();

router.post("/", sendMessage);

router.get("/messages/:id", getMessages);

router.get("/:id", getChats);

router.get("/unread/:id", getUnreadChats);

// router.put("/:id", getChats);

export default router;
