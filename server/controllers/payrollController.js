
/**
 * ADMIN: Process / create payroll
 */
import mongoose from "mongoose";
import { PayRoll } from "../models/payroll.model.js";
import { User } from "../models/user.model.js"; // Make sure you have User model

export const createPayroll = async (req, res) => {
  try {
    console.log("CREATE PAYROLL ROUTE HIT", req.body);

    const { employeeId, payPeriod, salaryStructure, deductions } = req.body;

    // ✅ Check all required fields
    if (!employeeId || !payPeriod || !salaryStructure) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ Check valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
      return res.status(400).json({ message: "Invalid employeeId" });
    }

    // ✅ Check employee exists
    const employee = await User.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // ✅ Calculate net salary
    const baseSalary = salaryStructure.baseSalary || 0;
    const allowances = salaryStructure.allowances || {};
    const bonuses = salaryStructure.bonuses || 0;

    const totalAllowances = (allowances.housing || 0) + (allowances.transport || 0) + (allowances.other || 0);
    const totalDeductions = (deductions?.tax || 0) + (deductions?.unpaidLeave || 0) + (deductions?.other || 0);

    const netSalary = baseSalary + totalAllowances + bonuses - totalDeductions;

    // ✅ Create Payroll
    const payroll = await PayRoll.create({
      employee: employeeId,
      payPeriod,
      salaryStructure,
      deductions: deductions || {},
      netSalary,
      processedBy: req.user.id, // Admin who processed
      status: "Processed"
    });

    return res.status(201).json({
      message: "Payroll processed successfully",
      payroll
    });

  } catch (error) {
    console.error("CREATE PAYROLL ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


/**
 * EMPLOYEE: View own payroll
 */
export const getMyPayroll = async (req, res) => {
  try {
    const payrolls = await PayRoll.find({ employee: req.user.id }).sort({
      "payPeriod.year": -1,
      "payPeriod.month": -1
    });

    res.json(payrolls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * ADMIN: View all payrolls
 */
export const getAllPayrolls = async (req, res) => {
  try {
    const payrolls = await PayRoll.find().populate("employee", "name email");
    res.json(payrolls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * ADMIN: Mark payroll as Paid
 */
export const markPayrollPaid = async (req, res) => {
  try {
    const payroll = await PayRoll.findById(req.params.id);
    if (!payroll) {
      return res.status(404).json({ message: "Payroll not found" });
    }

    payroll.status = "Paid";
    await payroll.save();

    res.json({ message: "Payroll marked as paid", payroll });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
