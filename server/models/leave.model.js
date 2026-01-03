
import mongoose from "mongoose";
const leaveSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  leaveType: { 
    type: String, 
    enum: ['Paid', 'Sick', 'Unpaid'], // [cite: 81]
    required: true 
  },
  startDate: { type: Date, required: true }, // [cite: 82]
  endDate: { type: Date, required: true }, // [cite: 82]
  remarks: String, // [cite: 83]
  status: { 
    type: String, 
    enum: ['Pending', 'Approved', 'Rejected'], // [cite: 85, 86, 87]
    default: 'Pending' 
  },
  adminComment: String, // [cite: 92]
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export const Leave = new mongoose.model("Leave" , leaveSchema)