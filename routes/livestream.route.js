import express from "express";
const router = express.Router();
import liveStramController from "../controllers/liveStream.controller.js";

router.post("/addliveStreams",liveStramController.createLiveStream);
router.get("/getStream",liveStramController.getliveStream);
router.delete("/deleteStream",liveStramController.deleteLiveStream);
router.get("/getallStream",liveStramController.getliveStreams);

export default router;