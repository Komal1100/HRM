import express from "express";
import { getAllUsers } from "../controllers/userController.js";
import { protect, isHR } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, isHR, getAllUsers);

export default router;
