import React from 'react';
import './Card.css';

const Card = ({ 
  children, 
  title, 
  subtitle,
  header,
  footer,
  variant = 'default',
  className = '',
  onClick,
  ...props 
}) => {
  const cardClasses = [
    'card',
    `card-${variant}`,
    onClick ? 'card-clickable' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} onClick={onClick} {...props}>
      {header && (
        <div className="card-header">
          {header}
        </div>
      )}
      
      {title && (
        <div className="card-title">
          <h3>{title}</h3>
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
      )}
      
      <div className="card-body">
        {children}
      </div>
      
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card; 