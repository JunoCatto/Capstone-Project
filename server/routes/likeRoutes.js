import { Router } from "express";
import controllers from "../controllers/index.js";
import { verifyToken } from "../middleware/auth.js";

let router = Router();

router.post(
  "/post/:postId/like",
  verifyToken,
  controllers.likeController.likePost
);
router.get(
  "/post/:postId/likes",
  verifyToken,
  controllers.likeController.getLikes
);

export default router;
