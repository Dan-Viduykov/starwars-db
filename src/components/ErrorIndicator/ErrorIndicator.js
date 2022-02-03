import React from 'react';
import './ErrorIndicator.css';
import icon from './death-star.png';

export default function ErrorIndicator() {
  return (
    <div className="error-indicator">
      <img className="icon" src={icon} alt="error-icon" />
      <p className="boom">BOOM!</p>
      <p>something has gone terribly wrong</p>
      <p>(bun we already sent droids to fix it)</p>
    </div>
  );
}
