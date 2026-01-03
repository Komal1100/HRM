import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, CalendarCheck, FileCheck, LogOut, Bell, 
  Sun, Moon, DollarSign 
} from "lucide-react";

import AttendanceManagement from "./AttendanceManagement";
import LeaveManagement from "./LeaveManagement";
import PayrollManagement from "./PayrollManagement";
import ProfileManagement from "./ProfileManagement";
import "./AdminDashboard.css"; 

export default function EmployeeDashboard() {
  const navigate = useNavigate();
  // Initialize from localStorage so it remembers the user's choice
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "light" ? false : true;
  });
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    // 1. Set global attribute for CSS variables
    document.documentElement.setAttribute('data-theme', theme);
    // 2. Set role-specific attribute
    document.documentElement.setAttribute('data-employee-theme', theme);
    // 3. Save preference
    localStorage.setItem("theme", theme);
  }, [isDarkMode]);

  const renderContent = () => {
    // Passing role="employee" ensures the child modules use green accents
    switch(activeTab) {
      case "attendance": return <AttendanceManagement role="employee" />;
      case "leave":      return <LeaveManagement role="employee" />;
      case "payroll":    return <PayrollManagement role="employee" />;
      case "profile":
      default:           return <ProfileManagement role="employee" />;
    }
  };

  return (
    /* The key is keeping 'employee-theme' separate from the 'dark'/'light' logic */
    <div className={`admin-wrapper employee-theme`}>
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="brand-logo"><User size={28} /></div>
          <span>Emp<span>Portal</span></span>
        </div>
        <nav className="admin-nav">
          <button className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab("profile")}>
            <User size={20} /><span>My Profile</span>
          </button>
          <button className={`nav-link ${activeTab === 'attendance' ? 'active' : ''}`} onClick={() => setActiveTab("attendance")}>
            <CalendarCheck size={20} /><span>My Attendance</span>
          </button>
          <button className={`nav-link ${activeTab === 'leave' ? 'active' : ''}`} onClick={() => setActiveTab("leave")}>
            <FileCheck size={20} /><span>My Leaves</span>
          </button>
          <button className={`nav-link ${activeTab === 'payroll' ? 'active' : ''}`} onClick={() => setActiveTab("payroll")}>
            <DollarSign size={20} /><span>My Payroll</span>
          </button>
     
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>Welcome back, John</h1>
          <button className="notif-btn"><Bell size={20} /></button>
        </header>
        <div className="admin-content-area">{renderContent()}</div>
      </main>
    </div>
  );
}