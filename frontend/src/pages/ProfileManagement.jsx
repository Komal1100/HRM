import React, { useState, useEffect } from "react";
import { 
  User, Mail, Phone, MapPin, Briefcase, 
  DollarSign, FileText, Camera, Save, Edit2, Download, Trash2, Sun, Moon
} from "lucide-react";
import "./ProfileManagement.css";

export default function ProfileManagement({ role = "employee" }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@company.com",
    phone: "+1 234 567 890",
    address: "123 Tech Lane, Silicon Valley, CA",
    designation: "Senior Software Engineer",
    department: "Engineering",
    salary: "$85,000 / year",
    documents: [
      { name: "Offer_Letter.pdf", size: "1.2 MB" },
      { name: "Contract_Agreement.pdf", size: "850 KB" },
      { name: "ID_Proof.jpg", size: "21 MB" }
    ]
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(URL.createObjectURL(file));
  };

  const isAdmin = role === "admin";

  return (
    <div className={`profile-page-wrapper ${role}-theme`}>
      <header className="profile-header-main">
        <div className="header-text">
          <h1>{isAdmin ? "Admin: Employee View" : "My Profile"}</h1>
          <p>Manage personal information and company documents</p>
        </div>
     
      </header>

      <div className="profile-content-grid">
        {/* LEFT COLUMN */}
        <aside className="profile-sidebar-card">
          <div className="profile-avatar-box">
            <div className="avatar-circle">
              {profileImage ? <img src={profileImage} alt="Profile" /> : profileData.name.charAt(0)}
              {/* Profile picture can be edited by both  */}
              <label className="avatar-edit-overlay">
                <Camera size={20} />
                <input type="file" hidden onChange={handleImageChange} accept="image/*" />
              </label>
            </div>
            <h2>{profileData.name}</h2>
            <span className="designation-pill">{profileData.designation}</span>
          </div>

          <div className="sidebar-contact-info">
            <div className="info-row"><Mail size={16} /> <span>{profileData.email}</span></div>
            <div className="info-row"><Phone size={16} /> <span>{profileData.phone}</span></div>
          </div>
        </aside>

        {/* RIGHT COLUMN */}
        <main className="profile-details-column">
          <section className="profile-glass-card">
            <h3 className="section-title"><User size={20} /> Personal Details</h3>
            <div className="profile-form-grid">
              <div className="form-field">
                <label>Full Name</label>
                {/* Admin can edit all details, Employee cannot edit name  */}
                <input 
                  type="text" 
                  value={profileData.name} 
                  disabled={!(isAdmin && isEditing)} 
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                />
              </div>
              <div className="form-field">
                <label>Phone Number</label>
                {/* Both can edit phone  */}
                <input 
                  type="text" 
                  value={profileData.phone} 
                  disabled={!isEditing}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                />
              </div>
              <div className="form-field span-2">
                <label>Residential Address</label>
                {/* Both can edit address  */}
                <input 
                  type="text" 
                  value={profileData.address} 
                  disabled={!isEditing}
                  onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                />
              </div>
            </div>
          </section>

          <section className="profile-glass-card">
            <h3 className="section-title"><Briefcase size={20} /> Job & Salary</h3>
            <div className="profile-form-grid">
              <div className="form-field">
                <label>Department</label>
                {/* Only Admin can edit job details  */}
                <input 
                  type="text" 
                  value={profileData.department} 
                  disabled={!(isAdmin && isEditing)} 
                  onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                />
              </div>
              <div className="form-field">
                <label>Annual Salary</label>
                {/* Only Admin can edit salary  */}
                <input 
                  type="text" 
                  value={profileData.salary} 
                  disabled={!(isAdmin && isEditing)} 
                  onChange={(e) => setProfileData({...profileData, salary: e.target.value})}
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}