import express from "express";
import {
  createPayroll,
  getMyPayroll,
  getAllPayrolls,
  markPayrollPaid
} from "../controllers/payrollController.js";
import { authMiddleware, adminMiddleware } from "../utils/authMiddleware.js";

const router = express.Router();

// =========================
// EMPLOYEE ROUTES
// =========================

// GET /api/payroll/my → Employee can view only their payroll
router.get("/my", authMiddleware, getMyPayroll);

// =========================
// ADMIN / HR ROUTES
// =========================

// POST /api/payroll/process → Admin creates payroll for an employee
router.post("/process", authMiddleware, adminMiddleware, createPayroll);

// GET /api/payroll → Admin can view all payrolls
router.get("/", authMiddleware, adminMiddleware, getAllPayrolls);

// PATCH /api/payroll/pay/:id → Admin marks a payroll as Paid
router.patch("/pay/:id", authMiddleware, adminMiddleware, markPayrollPaid);

export default router;
