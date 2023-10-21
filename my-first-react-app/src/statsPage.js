// src/StatsPage.js
import React from 'react';

function StatsPage({ location }) {
  const response = location.state ? location.state.response : "No response received.";

  return (
    <div>
      <h1>Server Response</h1>
      <p>{response}</p>
    </div>
  );
}

export default StatsPage;