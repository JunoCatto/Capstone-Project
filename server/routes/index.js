"use strict";

import { Router } from "express";
import userRoutes from "./userRoutes.js";
import postRoutes from "./postRoutes.js";
import likeRoutes from "./likeRoutes.js";
import commentRoutes from "./commentRoutes.js";

const router = Router();

router.use("/", userRoutes);
router.use("/", postRoutes);
router.use("/", likeRoutes);
router.use("/", commentRoutes);

export default router;
