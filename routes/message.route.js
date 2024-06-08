import messageController from "../controllers/message.controller.js";
import express from "express";
const router = express.Router();
import userAuthentication from "../middleware/userAuthentication.js";

router.post("/createMessage", userAuthentication, messageController.createMessage);
router.get("/getAllGroupMessages/:id", messageController.getAllMessages);
router.get("/getOneMessage/:message_id", messageController.getOneMessage);
router.delete("/deleteMessage/:message_id", messageController.deleteMessage);
router.get("/findMessagesFromUserIds/:receiver_user_id", userAuthentication, messageController.findMessagesFromUserIds);




export default router;  