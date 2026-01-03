import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    leaveType: {
      type: String,
      enum: ["Paid", "Sick", "Unpaid"],
      required: true
    },

    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },

    leaveDays: {
      type: Number,
      required: true
    },

    remarks: String,

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending"
    },

    adminComment: String,

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export const Leave = mongoose.model("Leave", leaveSchema);
