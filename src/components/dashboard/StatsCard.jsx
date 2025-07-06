import React from 'react';
import './StatsCard.css';

const StatsCard = ({ title, value, subtitle, icon, trend, trendValue, color = 'primary' }) => {
  return (
    <div className={`stats-card stats-card-${color}`}>
      <div className="stats-card-header">
        <div className="stats-icon">
          {icon}
        </div>
        <div className="stats-trend">
          {trend && (
            <span className={`trend-indicator ${trend}`}>
              {trend === 'up' ? '↗' : '↘'} {trendValue}
            </span>
          )}
        </div>
      </div>
      <div className="stats-content">
        <h3 className="stats-title">{title}</h3>
        <div className="stats-value">{value}</div>
        {subtitle && <p className="stats-subtitle">{subtitle}</p>}
      </div>
      <div className="stats-background">
        <div className="stats-pattern"></div>
      </div>
    </div>
  );
};

export default StatsCard; 