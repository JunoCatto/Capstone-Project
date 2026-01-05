import { Router } from "express";
import controllers from "../controllers/index.js";
import { verifyToken } from "../middleware/auth.js";

let router = Router();

// post routes / auth
router.post("/auth/register", controllers.userController.createUser);
router.post("/auth/login", controllers.userController.loginUser);

// get routes
router.get("/user/:id", verifyToken, controllers.userController.findUserById);
router.get("/user", verifyToken, controllers.userController.findAllUsers);

router.get("/user/:id/pic", controllers.userController.findUserProfilePic);

// update profile picture
router.put(
  "/user/:id/pic",
  verifyToken,
  controllers.userController.updateProfilePic
);

export default router;
