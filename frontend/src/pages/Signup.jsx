import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, UserCircle, User, Briefcase } from "lucide-react";
import "./Signup.css"; 

export default function Signup() {
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
    <div className={`signup-container ${role}-bg ${isExiting ? "page-exit" : ""}`}>
      <div className="signup-left">
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
        <div className="welcome-text">
          <h1>Get Started</h1>
          <p>The smartest way to manage your HR and team performance.</p>
        </div>
      </div>

      <div className="signup-right">
        <div className="glass-card-signup">
          <h2 className="signup-title">Create Account</h2>
          <span className="signup-subtitle">Enter your details to join the platform</span>

          <div className="input-group">
            <div className="input-icon"><User size={18} /></div>
            <input type="text" placeholder="Full Name" required />
          </div>

          <div className="input-group">
            <div className="input-icon"><Mail size={18} /></div>
            <input type="email" placeholder="Work Email" required />
          </div>

          <div className="input-group">
            <div className="input-icon"><Briefcase size={18} /></div>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="employee">Employee Account</option>
              <option value="admin">Admin / Manager Account</option>
            </select>
          </div>

          <div className="input-group">
            <div className="input-icon"><Lock size={18} /></div>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Create Password" 
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

          <button className="signup-btn">
            Create Account
          </button>

          <p className="login-footer">
  Already a member? 
<span 
  className="login-link" 
  onClick={() => handleNavigation("/login")} // Use handleNavigation instead of navigate
>    Sign in
  </span>
</p>
        </div>
      </div>
    </div>
  );
}