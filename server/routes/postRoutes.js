import { Router } from "express";
import controllers from "../controllers/index.js";

let router = Router();

// create post
router.post("/user/post", controllers.postController.createPost);

// get posts
router.get("/posts", controllers.postController.getPosts);

export default router;
