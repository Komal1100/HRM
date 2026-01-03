// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import authRoutes from "./routes/authRoutes.js";
// import userRoutes from "./routes/userRoutes.js";

// dotenv.config();
// const app = express();

// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);

// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log("MongoDB connected"))
//     .catch(err => console.log(err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// export { app }

// -------------------------------------------------------
// console.log("Leave routes registered");

// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import authRoutes from "./routes/authRoutes.js";
// import leaveRoutes from "./routes/leaveRoutes.js"

// dotenv.config();
// const app = express();
// app.use(express.json());



// // Routes
// app.use("/api/auth", authRoutes);

// app.get("/", (req, res) => res.send("API running"));
// app.use("/api/leaves", leaveRoutes);



// export { app }



import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import cookieParser from "cookie-parser";
import attendanceRoutes from "./routes/attendanceRoutes.js"
import payrollRoutes from "./routes/payrollRoutes.js"

dotenv.config();
const app = express();
app.use(express.json()); // <--- this parses JSON body
app.use(cookieParser());

console.log("App loaded"); // <-- debug

app.use("/api/auth", authRoutes);

console.log("Leave routes registered"); // <-- debug
app.use("/api/leaves", leaveRoutes);
app.use("/api/users", userRoutes);
app.use("/api/attendance",attendanceRoutes);
app.use("/api/payroll",payrollRoutes);

app.get("/", (req, res) => res.send("API running"));

export { app };
