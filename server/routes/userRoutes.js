import { Router } from "express";
import controllers from "../controllers/index.js";

let router = Router();

// post routes / auth
router.post("/auth/register", controllers.userController.createUser);
router.post("/auth/login", controllers.userController.loginUser);

// get routes
router.get("/user/:id", controllers.userController.findUserById);
router.get("/user", controllers.userController.findAllUsers);

export default router;
