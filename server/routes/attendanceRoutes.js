import express from "express";
import { checkIn, checkOut, viewMyAttendance, viewAllAttendance } from "../controllers/attendanceController.js";
import { authMiddleware, adminMiddleware } from "../utils/authMiddleware.js";

const router = express.Router();

router.post("/checkin", authMiddleware, checkIn);
router.post("/checkout", authMiddleware, checkOut);
router.get("/my", authMiddleware, viewMyAttendance);
router.get("/all", authMiddleware, adminMiddleware, viewAllAttendance);

export default router;
