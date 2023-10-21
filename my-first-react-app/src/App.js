// this is app.js

import React, { useState, useRef } from 'react';
import './App.css';
import LocationInput from './LocationInput';
import Map from './Map';
import logo from './logo.svg';
import UserForm from './userForm';  // <-- Import UserForm
import StatsPage from './statsPage';  // <-- Import StatsPage


function App() {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [selectedBorough, setSelectedBorough] = useState(''); // Initialize selected borough state
  const [showStatsPage, setShowStatsPage] = useState(false);  // <-- State to control the visibility of the StatsPage
  const [responseData, setResponseData] = useState(null);  // <-- State to hold the response data


  const setMapInstance = (googleMap) => {
    setMap(googleMap);
  };

  // Function that is passed to UserForm and will be triggered on successful submission
  const handleSuccessfulSubmit = (data) => {
    setResponseData(data);
    setShowStatsPage(true);
  };

  // Function to close the StatsPage
  const handleCloseStatsPage = () => {
    setShowStatsPage(false);
    setResponseData(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <h1>StreetSense</h1>
      <LocationInput updateMap={setSelectedBorough} map={map} />
      <Map ref={mapRef} location={selectedBorough} />
      <UserForm onSuccessfulSubmit={handleSuccessfulSubmit} />  
      {showStatsPage && <StatsPage data={responseData} onClose={handleCloseStatsPage} />} 
    </div>
  );
}

export default App;
