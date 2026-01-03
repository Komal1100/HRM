// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmployeeDashboard from './pages/EmployeeDashboard';
import AdminDashboard from "./pages/AdminDashboard";
import ProfileManagement from "./pages/ProfileManagement";
import AttendanceManagement from "./pages/AttendanceManagement";
import LeaveManagement from "./pages/LeaveManagement";
import PayrollManagement from "./pages/PayrollManagement";
function App() {
  return (
    <Router>
      <Routes>
        {/* Set Login as the default page */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route 
          path="/empdashboard" 
          element={<EmployeeDashboard />} 
        />
        <Route  path="/profilemanage" element = {<ProfileManagement/>}/>
         <Route  path="/attendancemanagement" element = {<AttendanceManagement/>}/>
          <Route  path="/leavemanagement" element = {<LeaveManagement/>}/>
          <Route  path="/payrollmanagement" element = {<PayrollManagement/>}/>


      </Routes>
    </Router>
  );
}

export default App;