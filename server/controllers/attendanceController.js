import { Attendance } from "../models/attendance.model.js";
import { User } from "../models/user.model.js"; // To populate employee details

export const checkIn = async (req, res) => {
  try {
    const employeeId = req.user.id;

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const existing = await Attendance.findOne({
      employee: employeeId,
      date: { $gte: start, $lte: end }
    });

    if (existing) {
      return res.status(400).json({ message: "You already checked in today" });
    }

    const attendance = await Attendance.create({
      employee: employeeId,
      date: new Date(),        // store actual timestamp
      checkIn: new Date(),
      status: "Present"
    });

    res.json({ message: "Check-in successful", attendance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



export const checkOut = async (req, res) => {
  try {
    const employeeId = req.user.id;

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    console.log("CHECK-OUT RANGE:", start, end);

    const attendance = await Attendance.findOne({
      employee: employeeId,
      date: { $gte: start, $lte: end }
    });

    console.log("FOUND ATTENDANCE:", attendance);

    if (!attendance) {
      return res.status(400).json({ message: "You need to check in first" });
    }

    if (attendance.checkOut) {
      return res.status(400).json({ message: "You already checked out today" });
    }

    attendance.checkOut = new Date();
    await attendance.save();

    res.json({ message: "Check-out successful", attendance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



export const viewMyAttendance = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const attendance = await Attendance.find({ employee: employeeId }).sort({ date: -1 });
    res.json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const viewAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate('employee', 'name email') // show employee name and email
      .sort({ date: -1 });
    res.json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export default {
  checkIn,
  checkOut,
  viewMyAttendance,
  viewAllAttendance
};
