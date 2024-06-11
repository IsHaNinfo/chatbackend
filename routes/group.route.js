import express from "express";
const router = express.Router();
import groupController from "../controllers/group.controller.js";

router.post("/createGroup",groupController.createGroup);
router.post("/addUserGroup/:id",groupController.addUserGroup);
router.get("/getGroupMembers/:id",groupController.getGroupMembers);
router.get("/findtheGroup",groupController.findGroupByName)
export default router;