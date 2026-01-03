import React, { useState } from "react";
import { DollarSign, TrendingUp, Search, PieChart, Save, Edit3 } from "lucide-react";
import "./PayrollManagement.css";

export default function PayrollManagement({ role = "employee", externalSearch = "" }) {
  const [internalSearch, setInternalSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const isAdmin = role === "admin";
  const activeSearch = isAdmin ? externalSearch : internalSearch;

  const [payrollData, setPayrollData] = useState([
    { id: 1, name: "John Doe", base: 5000, allowance: 1200, tax: 800, net: 5400, status: "Paid" },
    { id: 2, name: "Alice Smith", base: 6200, allowance: 1500, tax: 1100, net: 6600, status: "Pending" },
    { id: 3, name: "Robert Fox", base: 4800, allowance: 1000, tax: 700, net: 5100, status: "Paid" },
  ]);

  const handleSalaryUpdate = (id, field, value) => {
    setPayrollData(prev => prev.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: parseFloat(value) || 0 };
        updated.net = updated.base + updated.allowance - updated.tax;
        return updated;
      }
      return item;
    }));
  };

  return (
    <div className={`payroll-container ${role}-theme`}>
      <header className="payroll-header">
        <div className="payroll-title">
          <h1>Payroll & Salary</h1>
          <p>{isAdmin ? "Administrative Control Panel" : "Your Monthly Earnings Statement"}</p>
        </div>
      </header>

      <div className="payroll-stats">
        <div className="pay-card">
          <div className="pay-icon"><DollarSign /></div>
          <div className="pay-info">
            <span>{isAdmin ? "Total Disbursement" : "Total Net Pay"}</span>
            <h3>{isAdmin ? "$17,100.00" : "$5,400.00"}</h3>
          </div>
        </div>
        <div className="pay-card">
          <div className="pay-icon"><PieChart /></div>
          <div className="pay-info">
            <span>{isAdmin ? "Total Deductions" : "Deductions"}</span>
            <h3>{isAdmin ? "$2,600.00" : "$800.00"}</h3>
          </div>
        </div>
        <div className="pay-card">
          <div className="pay-icon"><TrendingUp /></div>
          <div className="pay-info">
            <span>Next Payout Date</span>
            <h3>Oct 30, 2024</h3>
          </div>
        </div>
      </div>

      <div className="payroll-main-content">
        <div className="content-toolbar">
          <h3>{isAdmin ? "Employee Payroll Directory" : "Earnings Breakdown"}</h3>
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

        <div className="payroll-glass-table">
          <table>
            <thead>
              <tr>
                {isAdmin && <th>Employee</th>}
                <th>Base Salary</th>
                <th>Allowances</th>
                <th>Tax / Deductions</th>
                <th>Net Payable</th>
                <th>Status</th>
                {isAdmin && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {payrollData
                .filter(p => !isAdmin ? p.name === "John Doe" : p.name.toLowerCase().includes(activeSearch.toLowerCase()))
                .map(pay => (
                <tr key={pay.id}>
                  {isAdmin && (
                    <td className="emp-cell">
                      <div className="avatar-small">{pay.name[0]}</div>
                      <span>{pay.name}</span>
                    </td>
                  )}
                  <td>
                    {isAdmin && editingId === pay.id ? (
                      <input type="number" className="table-input" value={pay.base} onChange={(e) => handleSalaryUpdate(pay.id, 'base', e.target.value)} />
                    ) : `$${pay.base.toLocaleString()}`}
                  </td>
                  <td>
                    {isAdmin && editingId === pay.id ? (
                      <input type="number" className="table-input" value={pay.allowance} onChange={(e) => handleSalaryUpdate(pay.id, 'allowance', e.target.value)} />
                    ) : `$${pay.allowance.toLocaleString()}`}
                  </td>
                  <td className="deduction-val">-${pay.tax.toLocaleString()}</td>
                  <td className="net-val">${pay.net.toLocaleString()}</td>
                  <td><span className={`pay-status ${pay.status.toLowerCase()}`}>{pay.status}</span></td>
                  {isAdmin && (
                    <td>
                      <button className="action-btn" onClick={() => setEditingId(editingId === pay.id ? null : pay.id)}>
                        {editingId === pay.id ? <Save size={16} /> : <Edit3 size={16} />}
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}