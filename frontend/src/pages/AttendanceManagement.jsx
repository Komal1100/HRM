import React, { useState } from "react";
import { 
  Search, Play, Square, LayoutGrid, List 
} from "lucide-react";
import "./AttendanceManagement.css";

export default function AttendanceManagement({ role = "employee", externalSearch = "" }) {
  const [viewType, setViewType] = useState("daily");
  const [currentDate] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const isAdmin = role === "admin";

  // State for internal search if used independently
  const [internalSearch, setInternalSearch] = useState("");
  const activeSearch = isAdmin ? externalSearch : internalSearch;

  const employees = [
    { id: 1, name: "John Doe", status: "Present" },
    { id: 2, name: "Alice Smith", status: "Absent" },
    { id: 3, name: "Robert Fox", status: "Present" },
  ];

  return (
    <div className={`attendance-container ${role}-theme`}>
      <header className="attendance-header">
        <div className="header-left">
          <h1>{isAdmin ? "Workforce Attendance" : "My Attendance"}</h1>
        </div>
        {!isAdmin && (
          <div className="check-in-section">
             <button className={`check-btn ${isCheckedIn ? 'active' : ''}`} onClick={() => setIsCheckedIn(!isCheckedIn)}>
               {isCheckedIn ? <Square size={18}/> : <Play size={18}/>}
               {isCheckedIn ? "Check Out" : "Check In"}
             </button>
          </div>
        )}
      </header>

      <div className="attendance-card">
        <div className="card-toolbar">
          <div className="view-toggle">
            <button className={viewType === 'daily' ? 'active' : ''} onClick={() => setViewType('daily')}><List size={18}/></button>
            <button className={viewType === 'weekly' ? 'active' : ''} onClick={() => setViewType('weekly')}><LayoutGrid size={18}/></button>
          </div>
          {/* {isAdmin && !externalSearch && (
             <div className="att-search-container">
               <Search size={18} />
               <input placeholder="Search employee..." onChange={(e) => setInternalSearch(e.target.value)} />
             </div>
          )} */}
        </div>

        <table className="attendance-table">
          <thead>
            <tr>
              <th>{isAdmin ? "Employee" : "Date"}</th>
              <th>Status</th>
              <th>Check In</th>
              <th>Check Out</th>
            </tr>
          </thead>
          <tbody>
            {employees
              .filter(emp => isAdmin ? emp.name.toLowerCase().includes(activeSearch.toLowerCase()) : emp.name === "John Doe")
              .map(emp => (
                <tr key={emp.id}>
                  <td>{isAdmin ? emp.name : currentDate.toLocaleDateString()}</td>
                  <td><span className={`status-pill ${emp.status.toLowerCase()}`}>{emp.status}</span></td>
                  <td>09:00 AM</td>
                  <td>06:00 PM</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}