import { Router } from "express";
import controllers from "../controllers/index.js";

let router = Router();

router.post("/user", controllers.userController.createUser);

router.get("/user/:id", controllers.userController.findUserById);

export default router;
