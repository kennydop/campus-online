import {Router} from "express";
import { sendMessage, getMessages, getChats, getUnreadChats, getChat } from "../controllers/chatsControllers.js"

const router = Router();

router.post("/", sendMessage);

router.get("/messages/:id", getMessages);


router.get("/:id", getChats);

router.get("/", getChat);

router.get("/unread/:id", getUnreadChats);


export default router;
