import React from 'react';
import { FaUserEdit, FaBriefcase, FaHandshake, FaBolt, FaTrophy } from 'react-icons/fa';
import './RecentActivitiesCard.css';

const RecentActivitiesCard = () => {
  const activities = [
    { id: 1, action: 'Profile updated', time: '2 hours ago', icon: <FaUserEdit /> },
    { id: 2, action: 'Applied for Job: Frontend Developer', time: '1 day ago', icon: <FaBriefcase /> },
    { id: 3, action: 'Received referral from John D.', time: '2 days ago', icon: <FaHandshake /> },
    { id: 4, action: 'Skill added: React.js', time: '3 days ago', icon: <FaBolt /> },
    { id: 5, action: 'Completed certification: JavaScript Basics', time: '1 week ago', icon: <FaTrophy /> },
  ];

  return (
    <div className="recent-activities-card">
      <div className="activities-header">
        <h3 className="activities-title">Recent Activities</h3>
        <button 
          className="view-all-button"
          onClick={() => console.log('View all activities')}
        >
          View All
        </button>
      </div>
      
      <div className="activities-list">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-item">
            <div className="activity-icon">{activity.icon}</div>
            <div className="activity-content">
              <div className="activity-action">{activity.action}</div>
              <div className="activity-time">{activity.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivitiesCard;
