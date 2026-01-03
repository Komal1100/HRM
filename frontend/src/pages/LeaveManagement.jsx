import React, { useState } from "react";
import { 
  Calendar, FileText, CheckCircle, XCircle, Clock, 
  Send, Plus, Filter, Info, MessageSquare, Search
} from "lucide-react";
import "./LeaveManagement.css";

export default function LeaveManagement({ role = "employee", externalSearch = "" }) {
  const [showApplyModal, setShowApplyModal] = useState(false);
  // FIX: Added internalSearch state to handle the input
  const [internalSearch, setInternalSearch] = useState("");
  
  const isAdmin = role === "admin";
  
  // Logic: Use search from Admin Dashboard if available, otherwise use local input
  const activeSearch = (externalSearch || internalSearch).toLowerCase();

  // FIX: Added 'setLeaveRequests' to the destructuring
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, name: "John Doe", type: "Sick Leave", start: "2024-03-22", end: "2024-03-24", remarks: "Recovering from flu", status: "Pending", adminComment: "" },
    { id: 2, name: "Alice Smith", type: "Paid Leave", start: "2024-04-01", end: "2024-04-05", remarks: "Family vacation", status: "Approved", adminComment: "Enjoy your break!" },
  ]);

  const handleStatusUpdate = (id, newStatus) => {
    const comment = prompt(`Enter ${newStatus} reason/comment:`);
    setLeaveRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: newStatus, adminComment: comment || req.adminComment } : req
    ));
  };

  return (
    <div className={`leave-container ${role}-theme`}>
      <header className="leave-header">
        <div className="leave-header-text">
          <h2>{isAdmin ? "Leave Applications" : "My Leave History"}</h2>
        </div>
        
        <div className="leave-actions">
          {!isAdmin && (
            <button className="apply-btn" onClick={() => setShowApplyModal(true)}>
              <Plus size={18} /> Apply Leave
            </button>
          )}
        </div>
      </header>

      <div className="leave-toolbar">
         <div className="stats-mini-row">
            <div className="mini-stat"><span>Used:</span> 05</div>
            <div className="mini-stat"><span>Available:</span> 12</div>
         </div>
         {/* Only show internal search if Admin Dashboard isn't already providing one */}
         {/* {isAdmin && !externalSearch && (
            <div className="att-search-container">
               <Search size={18} className="search-icon" />
               <input 
                  className="att-search-input"
                  placeholder="Search employee..." 
                  onChange={(e) => setInternalSearch(e.target.value)} 
               />
            </div>
         )} */}
      </div>

      <div className="leave-content-card">
        <div className="leave-list">
          <div className="list-header">
              <span>Request Details</span>
              <span>Status & Actions</span>
          </div>
          {leaveRequests
            .filter(req => !isAdmin ? req.name === "John Doe" : req.name.toLowerCase().includes(activeSearch))
            .map(req => (
            <div key={req.id} className="leave-item">
              <div className="leave-main-info">
                <div className="type-indicator" />
                <div className="details">
                  <h4>{req.type} {isAdmin && <span className="emp-name">for {req.name}</span>}</h4>
                  <p className="date-sub"><Calendar size={13}/> {req.start} — {req.end}</p>
                  <p className="remarks-sub"><Info size={13}/> {req.remarks}</p>
                  {req.adminComment && (
                    <p className="admin-comment"><MessageSquare size={13}/> <b>Admin:</b> {req.adminComment}</p>
                  )}
                </div>
              </div>

              <div className="leave-status-zone">
                <span className={`status-pill ${req.status.toLowerCase()}`}>
                  {req.status}
                </span>
                
                {isAdmin && req.status === "Pending" && (
                  <div className="decision-actions">
                    <button className="approve-action" onClick={() => handleStatusUpdate(req.id, "Approved")}>Approve</button>
                    <button className="reject-action" onClick={() => handleStatusUpdate(req.id, "Rejected")}>Reject</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Employee Application Modal */}
      {showApplyModal && (
        <div className="modal-overlay">
          <div className="leave-modal">
            <div className="modal-head">
               <h2>New Leave Request</h2>
               <button onClick={() => setShowApplyModal(false)}><XCircle /></button>
            </div>
            <div className="modal-body">
              <div className="input-field">
                <label>Leave Category</label>
                <select>
                  <option>Paid Leave</option>
                  <option>Sick Leave</option>
                  <option>Unpaid Leave</option>
                </select>
              </div>
              <div className="date-grid">
                <div className="input-field">
                  <label>From</label>
                  <input type="date" />
                </div>
                <div className="input-field">
                  <label>To</label>
                  <input type="date" />
                </div>
              </div>
              <div className="input-field">
                <label>Remarks / Reason</label>
                <textarea placeholder="Please provide a brief reason..."></textarea>
              </div>
              <button className="submit-request-btn" onClick={() => setShowApplyModal(false)}>
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}