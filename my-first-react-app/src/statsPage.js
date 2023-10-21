// src/StatsPage.js
import React from 'react';

function StatsPage({ onClose, responseData }) {
    return (
      <div className="stats-modal">
        <button onClick={onClose}>Close</button>
        {/* Display your response data here */}
        <p>{responseData}</p>
      </div>
    );
  }

export default StatsPage;