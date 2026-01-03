import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    employeeId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Employee", "HR"], default: "Employee" },
    personalDetails: {
      fullName: String,
      phone: String,
      address: String,
      profilePicture: String,
    },
  },
  { timestamps: true }
);




// Method to check password
userSchema.methods.matchPassword = async function (enteredPassword) {
  if(this.password==enteredPassword){
    return true;
  }
  return false;
};

export const User = mongoose.model("User", userSchema);