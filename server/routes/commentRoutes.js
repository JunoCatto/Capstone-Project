import { Router } from "express";
import controllers from "../controllers/index.js";
import { verifyToken } from "../middleware/auth.js";

let router = Router();

router.post(
  "/post/:postId/comment",
  verifyToken,
  controllers.commentController.createComment
);

router.get(
  "/post/:postId/comments",
  verifyToken,
  controllers.commentController.getComments
);

export default router;
