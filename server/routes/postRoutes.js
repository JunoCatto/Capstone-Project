import { Router } from "express";
import controllers from "../controllers/index.js";
import { verifyToken } from "../middleware/auth.js";

let router = Router();

// create post
router.post("/user/post", verifyToken, controllers.postController.createPost);

// get posts
// Need to input pagination
router.get("/posts", verifyToken, controllers.postController.getPosts);

export default router;
