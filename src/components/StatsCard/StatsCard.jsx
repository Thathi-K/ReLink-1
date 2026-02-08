import React from 'react';
import './StatsCard.css';

const StatsCard = ({ title, value, description, icon, trend }) => {
  return (
    <div className="stats-card">
      <div className="stats-card-header">
        <span className="stats-icon">{icon}</span>
        <h3 className="stats-title">{title}</h3>
      </div>
      <div className="stats-value">{value}</div>
      {description && (
        <p className="stats-description">{description}</p>
      )}
      {trend && (
        <div className={`stats-trend ${trend.type}`}>
          <span className="trend-icon">{trend.icon}</span>
          <span className="trend-value">{trend.value}</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;