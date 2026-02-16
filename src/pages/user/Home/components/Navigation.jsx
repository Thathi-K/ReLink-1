// src/pages/Home/components/Navigation.jsx
import React from 'react';
import {
  Home as HomeIcon, Briefcase, MessageCircle, Users, User,
  BarChart3, Sun, Moon, GraduationCap, HeartHandshake
} from "lucide-react";

function Navigation({ 
  activeTab, 
  setActiveTab, 
  user, 
  credibilityScore, 
  profilePicture,
  darkMode,
  onDarkModeToggle,
  onLogoAnimation,
  logoRef,
  logo
}) {
  const navItems = [
    { id: 'overview', icon: BarChart3, label: 'Overview' },
    { id: 'home', icon: HomeIcon, label: 'Home' },
    { id: 'networking', icon: Briefcase, label: 'Networking' },
    { id: 'learning', icon: GraduationCap, label: 'Learning' },
    { id: 'mentors', icon: HeartHandshake, label: 'Mentors' },
    { id: 'community', icon: Users, label: 'Community' },
    { id: 'messages', icon: MessageCircle, label: 'Messages' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="side-navigation">
      <div className="nav-container">
        <div className="logo-section" onClick={onLogoAnimation}>
          <img ref={logoRef} src={logo} alt="RE-Link Logo" className="logo-image" />
          <div className="logo-text">
            <h1 className="logo-title">RE-LINK</h1>
            <p className="logo-slogan">Second Chances, Real Connections</p>
          </div>
        </div>

        <div className="nav-items">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <div className="nav-icon">
                <item.icon size={22} />
              </div>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="user-summary">
          <div className="profile-avatar">
            {profilePicture ? (
              <img src={profilePicture} alt="Profile" className="profile-avatar-img" />
            ) : (
              <span className="avatar-initial">{user?.name?.charAt(0) || "U"}</span>
            )}
          </div>
          <div className="profile-info">
            <span className="profile-name">{user?.name || "User"}</span>
            <span className="profile-type">
              {user?.userType?.replace('-', ' ').toUpperCase() || "MEMBER"}
            </span>
          </div>
          <div className="credibility-score">
            <div className="score-circle">
              <span className="score-value">{credibilityScore}</span>
            </div>
            <span className="score-label">CRED</span>
          </div>
        </div>

        <div className="theme-toggle">
          <button
            className={`theme-toggle-btn ${darkMode ? 'dark' : 'light'}`}
            onClick={onDarkModeToggle}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navigation;