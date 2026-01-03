import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Eye, EyeOff, Mail, Lock, UserCircle } from "lucide-react"; // Modern icons
import "./Login.css";

export default function Login() {
  const [role, setRole] = useState("employee");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

const handleNavigation = (path) => {
  setIsExiting(true); // Start the exit animation
  setTimeout(() => {
    navigate(path);
  }, 400); // Matches the duration of the fade-out
};

  return (
    <div className={`login-container ${role}-bg${isExiting ? "page-exit" : ""}`}>
      <div className="login-left">
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
        <div className="blob blob3"></div>
        <div className="welcome-text">
          <h1>Welcome Back</h1>
          <p>Access your dashboard and manage your workspace.</p>
        </div>
      </div>

      <div className="login-right">
        <div className="glass-card">
          <h2 className="login-title">
            {role === "admin" ? "Admin Portal" : "Employee Portal"}
          </h2>

          {/* Email Input */}
          <div className="input-group">
            <div className="input-icon"><Mail size={18} /></div>
            <input type="email" placeholder="Email Address" required />
          </div>

          {/* Password Input with Visibility Toggle */}
          <div className="input-group">
            <div className="input-icon"><Lock size={18} /></div>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              required 
            />
            <button 
              type="button"
              className="visibility-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Role Select */}
          <div className="input-group">
            <div className="input-icon"><UserCircle size={18} /></div>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button className="login-btn">
            <span>{role === "admin" ? "Login as Admin" : "Login to Account"}</span>
          </button>

          <p className="login-footer">
            Don’t have an account? 
            {/* 3. Add onClick event */}
            <span 
            className="login-link" 
            onClick={() => handleNavigation("/signup")} // Use handleNavigation instead of navigate
            > Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}