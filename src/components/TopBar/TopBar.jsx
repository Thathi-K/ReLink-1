import React, { useState } from 'react';
import { FaSearch, FaBell } from 'react-icons/fa';
import './TopBar.css';

const TopBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleNotifications = () => {
    console.log('Notifications clicked');
  };

  return (
    <header className="topbar">
      
      <div className="topbar-left">
        <span className="welcome-text"></span>
        <span className="username"></span>
      </div>

      {/* Right: Search + Notification */}
      <div className="topbar-right">
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            <FaSearch />
          </button>
        </form>

        <button className="notifications-button" onClick={handleNotifications}>
          <FaBell className="notification-icon" />
          <span className="notification-badge">3</span>
        </button>
      </div>
    </header>
  );
};

export default TopBar;
