import React, { useRef, useState } from 'react';
import {
  UserCheck, GraduationCap, Briefcase, Settings,
  LogOut, Trash2, Camera, Mail, Phone, MapPin
} from "lucide-react";

function ProfileTab({ user: initialUser, profilePicture, onProfilePictureUpdate, onLogout, onDeleteAccount }) {
  const profilePicRef = useRef(null);

  // State for editing and updated user info
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState(initialUser || {});

  // Handle profile picture upload
  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onProfilePictureUpdate(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle input changes
  const handleChange = (field, value) => {
    setUser({ ...user, [field]: value });
  };

  // Handle save
  const handleSave = async () => {
    try {
      // Simulate backend update
      const response = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!response.ok) throw new Error("Failed to update profile");
      const updatedData = await response.json();
      setUser(updatedData); // update local state with backend response
      setEditing(false);
    } catch (error) {
      console.error(error);
      alert("Failed to save changes.");
    }
  };

  return (
    <div className="profile-tab">
      {/* Profile Header */}
      <div className="profile-header-section">
        <div className="profile-cover">
          <div className="profile-avatar-large" onClick={() => profilePicRef.current?.click()}>
            {profilePicture ? (
              <img src={profilePicture} alt="Profile" className="profile-avatar-img-large" />
            ) : (
              <span className="avatar-initial-large">{user?.name?.charAt(0) || "U"}</span>
            )}
            <div className="avatar-overlay">
              <Camera size={24} />
            </div>
          </div>
          <input
            type="file"
            ref={profilePicRef}
            accept="image/*"
            onChange={handleProfilePictureUpload}
            style={{ display: 'none' }}
          />

          <div className="profile-info-main">
            {editing ? (
              <input
                type="text"
                className="profile-name-input"
                value={user.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            ) : (
              <h2 className="profile-name">{user.name || "Your Name"}</h2>
            )}

            <p className="profile-title">RE-Link Member - South Africa</p>

            {/* Edit / Save button */}
            <button
              className="edit-btn"
              onClick={() => (editing ? handleSave() : setEditing(true))}
            >
              {editing ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="profile-content">

        {/* Personal Information */}
        <ProfileSection title="Personal Information" icon={UserCheck}>
          <div className="personal-info-grid">
            <InfoItem
              label="Full Name"
              value={user.name}
              editing={editing}
              onChange={(val) => handleChange("name", val)}
            />
            <InfoItem
              label="Email"
              value={user.email}
              icon={Mail}
              editing={editing}
              onChange={(val) => handleChange("email", val)}
            />
            <InfoItem
              label="Phone"
              value={user.phone}
              icon={Phone}
              editing={editing}
              onChange={(val) => handleChange("phone", val)}
            />
            <InfoItem
              label="Location"
              value={user.location}
              icon={MapPin}
              editing={editing}
              onChange={(val) => handleChange("location", val)}
            />
          </div>
        </ProfileSection>

        {/* Skills */}
        <ProfileSection title="Skills" icon={GraduationCap}>
          <div className="skills-section">
            <div className="skills-list">
              {["Construction", "Leadership", "Team Management", "Safety Compliance", "Problem Solving", "Communication"].map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        </ProfileSection>

        {/* Work Experience */}
        <ProfileSection title="Work Experience" icon={Briefcase}>
          <div className="experience-list">
            <ExperienceItem
              title="Construction Supervisor"
              company="BuildRight Construction"
              duration="2023 - Present"
            />
            <ExperienceItem
              title="Construction Worker"
              company="BuildRight Construction"
              duration="2023 (6 months)"
            />
          </div>
        </ProfileSection>

        {/* Account Actions */}
        <ProfileSection title="Account" icon={Settings}>
          <div className="account-actions">
            <ActionButton
              icon={LogOut}
              label="Logout"
              onClick={onLogout}
              className="logout"
            />
            <ActionButton
              icon={Trash2}
              label="Delete Account"
              onClick={onDeleteAccount}
              className="delete"
            />
          </div>
        </ProfileSection>
      </div>
    </div>
  );
}

// ---------- Subcomponents ---------- //

function ProfileSection({ title, icon: Icon, children }) {
  return (
    <div className="profile-section">
      <div className="section-header">
        <h3 className="section-title">
          <Icon size={24} />
          <span>{title}</span>
        </h3>
      </div>
      {children}
    </div>
  );
}

function InfoItem({ label, value, icon: Icon, editing, onChange }) {
  return (
    <div className="info-item">
      <span className="info-label">{label}</span>
      <div className="info-value-wrapper">
        {Icon && <Icon size={14} className="info-icon" />}
        {editing ? (
          <input
            type="text"
            className="info-input"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <span className="info-value">{value || "Not provided"}</span>
        )}
      </div>
    </div>
  );
}

function ExperienceItem({ title, company, duration }) {
  return (
    <div className="experience-item">
      <div className="exp-icon">
        <Briefcase size={20} />
      </div>
      <div className="exp-details">
        <h5 className="exp-title">{title}</h5>
        <p className="exp-company">{company}</p>
        <span className="exp-duration">{duration}</span>
      </div>
    </div>
  );
}

function ActionButton({ icon: Icon, label, onClick, className }) {
  return (
    <button className={`account-action-btn ${className}`} onClick={onClick}>
      <Icon size={18} />
      <div className="action-content">
        <span className="action-title">{label}</span>
      </div>
    </button>
  );
}

export default ProfileTab;
