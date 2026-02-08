import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileCompletionCard.css';

const ProfileCompletionCard = ({ percentage = 75 }) => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setProgress(percentage), 100);
    return () => clearTimeout(timeout);
  }, [percentage]);

  const profileTasks = [
    { id: 1, label: 'Basic information added', completed: true },
    { id: 2, label: 'Skills & certifications added', completed: true },
    { id: 3, label: 'Add video introduction', completed: false },
    { id: 4, label: 'Complete work history', completed: false },
  ];

  const handleCompleteProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="profile-completion-card">
      <div className="completion-header">
        <h3 className="completion-title">Profile Completion</h3>
        <div className="completion-percentage">{percentage}%</div>
      </div>

      <div className="progress-wrapper">
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <p className="completion-subtitle">
        Almost there! Complete your profile to increase credibility.
      </p>

      <div className="tasks-list">
        {profileTasks.map(task => (
          <div key={task.id} className="task-item">
            <span className={`task-status ${task.completed ? 'completed' : 'pending'}`}>
              {task.completed ? '✓' : '○'}
            </span>
            <span className={`task-label ${task.completed ? 'completed' : 'pending'}`}>
              {task.label}
            </span>
          </div>
        ))}
      </div>

      <button className="complete-profile-button" onClick={handleCompleteProfile}>
        Complete Your Profile
      </button>
    </div>
  );
};

export default ProfileCompletionCard;
