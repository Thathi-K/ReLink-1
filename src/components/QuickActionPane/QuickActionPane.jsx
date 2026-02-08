import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHandshake, FaBolt, FaSearch, FaChalkboardTeacher, FaArrowRight } from 'react-icons/fa';
import './QuickActionPane.css';

const QuickActionsPane = () => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 1,
      title: 'Request Referrals',
      icon: <FaHandshake />,
      description: 'Ask connections for referrals',
      onClick: () => {
        console.log('Request Referrals clicked');
        navigate('/referrals');
      }
    },
    {
      id: 2,
      title: 'Update Skills',
      icon: <FaBolt />,
      description: 'Add or update your skills',
      onClick: () => {
        console.log('Update Skills clicked');
        navigate('/profile');
      }
    },
    {
      id: 3,
      title: 'Browse Skills',
      icon: <FaSearch />,
      description: 'Explore skills to learn',
      onClick: () => {
        console.log('Browse Skills clicked');
        // TODO: Navigate to skills page
      }
    },
    {
      id: 4,
      title: 'Mentor Session',
      icon: <FaChalkboardTeacher />,
      description: 'Schedule mentorship',
      onClick: () => {
        console.log('Mentor Session clicked');
        // TODO: Schedule mentorship
      }
    },
  ];

  return (
    <div className="quick-actions-pane">
      <h3 className="actions-title">Quick Actions</h3>
      <p className="actions-subtitle">Take action to boost your profile</p>
      
      <div className="actions-grid">
        {actions.map((action) => (
          <button
            key={action.id}
            className="action-button"
            onClick={action.onClick}
          >
            <div className="action-left">
              <div className="action-icon">{action.icon}</div>
              <div className="action-content">
                <h4 className="action-title">{action.title}</h4>
                <p className="action-description">{action.description}</p>
              </div>
            </div>
            <FaArrowRight className="action-arrow" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsPane;
