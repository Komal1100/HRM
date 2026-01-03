import express from "express";
import {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus
} from "../controllers/leaveController.js";

import { protect } from "../middleware/authMiddleware.js";
import { isEmployee, isHR } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/apply", protect, isEmployee, applyLeave);
router.get("/my-leaves", protect, isEmployee, getMyLeaves);

router.get("/all", protect, isHR, getAllLeaves);
router.put("/update/:leaveId", protect, isHR, updateLeaveStatus);

export default router;
