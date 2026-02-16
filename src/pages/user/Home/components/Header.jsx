import React from 'react';
import { Search, X } from "lucide-react";

function Header({ searchQuery, setSearchQuery, user }) {
  return (
    <header className="top-header">
      <div className="search-section">
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search jobs, posts, members, or resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button className="clear-search" onClick={() => setSearchQuery("")}>
              <X size={16} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;