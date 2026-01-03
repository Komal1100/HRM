import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true }, // [cite: 28]
  email: { type: String, required: true, unique: true }, // [cite: 30]
  password: { type: String, required: true }, // [cite: 31]
  role: { type: String, enum: ['Employee', 'HR'], default: 'Employee' }, // [cite: 32]
  personalDetails: {
    fullName: String,
    phone: String, // 
    address: String, // 
    profilePicture: String, // [cite: 63, 65]
  },
  jobDetails: {
    designation: String,
    department: String,
    joiningDate: Date,
  },
  salaryStructure: { // [cite: 61, 100]
    baseSalary: Number,
    allowances: Number,
    deductions: Number
  },
  documents: [String] // [cite: 62]
}, { timestamps: true });

export const User = new mongoose.model("User" , userSchema)