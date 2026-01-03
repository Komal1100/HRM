import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, CalendarCheck, FileCheck, LogOut, Bell, Search, 
  Filter, MoreVertical, ShieldCheck, Sun, Moon, DollarSign 
} from "lucide-react";

import AttendanceManagement from "./AttendanceManagement";
import LeaveManagement from "./LeaveManagement";
import PayrollManagement from "./PayrollManagement";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("employees");

  // Sync theme to root and ensure admin-specific styling
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-admin-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const [employees] = useState([
    { id: 1, name: "Alice Johnson", role: "Developer", status: "On Duty" },
    { id: 2, name: "Bob Smith", role: "Designer", status: "On Leave" },
    { id: 3, name: "Charlie Davis", role: "HR Manager", status: "On Duty" },
  ]);

  const renderContent = () => {
    // We explicitly pass role="admin" to all sub-modules here
    switch(activeTab) {
      case "attendance": 
        return <AttendanceManagement role="admin" externalSearch={searchTerm} />;
      case "leave":      
        return <LeaveManagement role="admin" externalSearch={searchTerm} />;
      case "payroll":    
        return <PayrollManagement role="admin" externalSearch={searchTerm} />;
      default:           
        return (
          <section className="admin-grid">
            <div className="stats-row">
              <div className="mini-card"><h3>Total Staff</h3><p>42</p></div>
              <div className="mini-card green"><h3>Present Today</h3><p>38</p></div>
              <div className="mini-card orange"><h3>Pending Leaves</h3><p>5</p></div>
            </div>
            <div className="admin-glass-card">
              <div className="card-top"><h2>Active Directory</h2></div>
              <table className="employee-table">
                <thead>
                  <tr><th>Employee Name</th><th>Designation</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {employees.filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase())).map(emp => (
                    <tr key={emp.id} className="table-row">
                      <td><div className="user-info"><div className="user-img">{emp.name[0]}</div>{emp.name}</div></td>
                      <td>{emp.role}</td>
                      <td><span className={`status-pill ${emp.status === 'On Leave' ? 'off' : 'on'}`}>{emp.status}</span></td>
                      <td><button className="action-dot"><MoreVertical size={16} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
    }
  };

  return (
    <div className={`admin-wrapper admin-theme ${isDarkMode ? 'dark' : 'light'}`}>
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="brand-logo"><ShieldCheck size={28} /></div>
          <span>HRM<span>Admin</span></span>
        </div>
        <nav className="admin-nav">
          <button className={`nav-link ${activeTab === 'employees' ? 'active' : ''}`} onClick={() => setActiveTab("employees")}><Users size={20} /><span>Employees</span></button>
          <button className={`nav-link ${activeTab === 'attendance' ? 'active' : ''}`} onClick={() => setActiveTab("attendance")}><CalendarCheck size={20} /><span>Attendance</span></button>
          <button className={`nav-link ${activeTab === 'leave' ? 'active' : ''}`} onClick={() => setActiveTab("leave")}><FileCheck size={20} /><span>Leaves</span></button>
          <button className={`nav-link ${activeTab === 'payroll' ? 'active' : ''}`} onClick={() => setActiveTab("payroll")}><DollarSign size={20} /><span>Payroll</span></button>
          
          <div className="admin-sidebar-footer">
            <button className="admin-theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              <span>{isDarkMode ? "Light" : "Dark"}</span>
            </button>
            <button onClick={() => navigate("/login")} className="nav-link logout-btn"><LogOut size={20} /><span>Exit</span></button>
          </div>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>Admin Control Center</h1>
          <div className="search-bar">
            <Search size={18} />
            <input type="text" placeholder="Search..." onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </header>
        <div className="admin-content-area">{renderContent()}</div>
      </main>
    </div>
  );
}