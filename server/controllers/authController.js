// import { User } from "../models/user.model.js";

// // REGISTER
// export const registerUser = async (req, res) => {
//     const { employeeId, email, password, role, personalDetails } = req.body;

//     try {
//         const userExists = await User.findOne({ email });
//         if (userExists)
//             return res.status(400).json({ message: "User already exists" });

//         const user = await User.create({
//             employeeId,
//             email,
//             password,
//             role,
//             personalDetails,
//         });

//         res.status(201).json({
//             _id: user._id,
//             email: user.email,
//             role: user.role,
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // LOGIN
// export const loginUser = async (req, res, next) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user)
//             return res.status(400).json({ message: "Invalid email or password" });

//         const isMatch = await user.matchPassword(password);
//         if (!isMatch)
//             return res.status(400).json({ message: "Invalid email or password" });

//         // Attach user to req.user so middleware can use it
//         req.user = user;

//         // Call next middleware (if you want attachUser to run)
//         next();

//         // OR, if you want to respond directly:
//         // res.json({
//         //     message: "Login successful",
//         //     user: {
//         //         _id: user._id,
//         //         email: user.email,
//         //         role: user.role,
//         //         personalDetails: user.personalDetails,
//         //     },
//         // });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };



import { User } from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

// REGISTER
export const registerUser = async (req, res) => {
  const { employeeId, email, password, role, personalDetails } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({
      employeeId,
      email,
      password,
      role,
      personalDetails,
    });

    res.status(201).json({
      _id: user._id,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });
    const option = {
            httpOnly: true,
            secure: true
        }
    res
    .cookie("token", generateToken(user._id))
    .json({
      _id: user._id,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
