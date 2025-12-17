import { Router } from "express";
import controllers from "../controllers/index.js";

let router = Router();

router.post("/post/:postId/like", controllers.likeController.likePost);
router.get("/post/:postId/likes", controllers.likeController.getLikes);

export default router;
