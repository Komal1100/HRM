import mongoose from "mongoose";
const payrollSchema = new mongoose.Schema({
  // Link to the specific employee
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Tracks the specific month and year for the record
  payPeriod: {
    month: { type: String, required: true }, // e.g., "January"
    year: { type: Number, required: true }   // e.g., 2024
  },
  // Salary Structure [cite: 61, 100]
  salaryStructure: {
    baseSalary: { type: Number, required: true },
    allowances: {
      housing: { type: Number, default: 0 },
      transport: { type: Number, default: 0 },
      other: { type: Number, default: 0 }
    },
    bonuses: { type: Number, default: 0 }
  },
  // Deductions based on attendance or policy
  deductions: {
    tax: { type: Number, default: 0 },
    unpaidLeave: { type: Number, default: 0 }, // Linked to Leave & Attendance [cite: 73, 81]
    other: { type: Number, default: 0 }
  },
  // Calculated Final Payout
  netSalary: {
    type: Number,
    required: true
  },
  // Metadata for Payroll Accuracy 
  status: {
    type: String,
    enum: ['Draft', 'Processed', 'Paid'],
    default: 'Draft'
  },
  processedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Admin/HR who updated the salary structure [cite: 98, 100]
  }
}, { timestamps: true });

export const PayRoll = new mongoose.model("PayRoll" , payrollSchema)