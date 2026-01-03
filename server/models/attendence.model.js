import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  checkIn: Date,
  checkOut: Date,
  status: { 
    type: String, 
    enum: ['Present', 'Absent', 'Half-day', 'Leave'], // [cite: 71, 72, 73]
    default: 'Absent'
  }
});

export const Attendance = new mongoose.model("Attendance" , attendanceSchema)