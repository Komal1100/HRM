// utils/generateToken.js
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || "secret123", {
    expiresIn: "7d", // token valid for 7 days
  });
};

export default generateToken;
