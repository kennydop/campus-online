import {Router} from "express";
import { getNotifications, getUnreadNotifications, sendNotification } from "../controllers/notificationsController.js";

const router = Router();

router.post("/", sendNotification);

router.get("/:id", getNotifications);

router.get("/unread/:id", getUnreadNotifications);

export default router;