import { Leave } from "../models/leave.model.js";
import { Attendance } from "../models/attendence.model.js";


export const applyLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, remarks } = req.body;

    if (new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({ message: "Invalid date range" });
    }

    // Prevent overlapping leave
    const overlappingLeave = await Leave.findOne({
      employee: req.user._id,
      status: { $ne: "Rejected" },
      $or: [
        { startDate: { $lte: endDate, $gte: startDate } },
        { endDate: { $gte: startDate, $lte: endDate } }
      ]
    });

    if (overlappingLeave) {
      return res.status(400).json({ message: "Leave already exists for these dates" });
    }

    const days =
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1;

    const leave = await Leave.create({
      employee: req.user._id,
      leaveType,
      startDate,
      endDate,
      leaveDays: days,
      remarks
    });

    res.status(201).json({ message: "Leave applied", leave });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ employee: req.user._id })
      .sort({ createdAt: -1 });

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("employee", "employeeId personalDetails.fullName")
      .populate("approvedBy", "personalDetails.fullName")
      .sort({ createdAt: -1 });

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateLeaveStatus = async (req, res) => {
  try {
    const { status, adminComment } = req.body;
    const { leaveId } = req.params;

    const leave = await Leave.findById(leaveId);

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    if (leave.status !== "Pending") {
      return res.status(400).json({ message: "Leave already processed" });
    }

    leave.status = status;
    leave.adminComment = adminComment;
    leave.approvedBy = req.user._id;

    await leave.save();

    // Attendance update
    if (status === "Approved") {
      let date = new Date(leave.startDate);
      const end = new Date(leave.endDate);

      while (date <= end) {
        await Attendance.findOneAndUpdate(
          { employee: leave.employee, date },
          { employee: leave.employee, date, status: "Leave" },
          { upsert: true }
        );
        date.setDate(date.getDate() + 1);
      }
    }

    res.json({ message: `Leave ${status}`, leave });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

