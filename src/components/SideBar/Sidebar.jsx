import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaHome,
  FaUser,
  FaCalendarAlt,
  FaAward,
  FaBriefcase,
  FaUsers,
  FaFileAlt,
  FaSignOutAlt,
} from 'react-icons/fa';
import './Sidebar.css';
import logo from '../../assets/RelinkLOGO.jpeg';

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: <FaHome className="nav-icon" /> },
  { path: '/profile', label: 'My Profile', icon: <FaUser className="nav-icon" /> },
  { path: '/timeline', label: 'Timeline', icon: <FaCalendarAlt className="nav-icon" /> },
  { path: '/referrals', label: 'Referrals', icon: <FaAward className="nav-icon" /> },
  { path: '/job-opportunities', label: 'Job Opportunities', icon: <FaBriefcase className="nav-icon" /> },
  { path: '/mentors', label: 'Mentors', icon: <FaUsers className="nav-icon" /> },
  { path: '/documents', label: 'Documents', icon: <FaFileAlt className="nav-icon" /> },
];

const Sidebar = () => {

  const handleSignOut = () => {
    const confirmed = window.confirm('Are you sure you want to sign out?');
    if (confirmed) {
      window.location.href = 'http://localhost:5174/';
    }
  };

  return (
    <aside className="sidebar">
      {/* Logo / Header */}
      <div className="sidebar-header">
        <img src={logo} alt="ReLink Logo" className="sidebar-logo" />
        <span className="sidebar-logo-text">ReLink</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map(item => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {item.icon}
                <span className="nav-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Account Section at Bottom */}
      <div className="sidebar-bottom">
        <NavLink to="/profile" className="avatar-link">
          <div className="avatar">
            <img src="/avatar-placeholder.png" alt="User Avatar" />
          </div>
        </NavLink>
        <div className="account-info">
          <span className="account-name">Marcus</span>
          <button
            className="signout-button"
            onClick={handleSignOut}
          >
            <FaSignOutAlt className="signout-icon" />
            <span className="signout-text">Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
