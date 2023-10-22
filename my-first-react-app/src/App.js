import React, { useState, useRef } from 'react';
import './App.css';
import LocationInput from './LocationInput';
import Map from './Map';
import UserForm from './userForm';  // Import UserForm
import StatsPage from './statsPage';  // Import StatsPage

function App() {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [selectedBorough, setSelectedBorough] = useState('');
  const [showStatsPage, setShowStatsPage] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const setMapInstance = (googleMap) => {
    setMap(googleMap);
  };

  const handleSuccessfulSubmit = (data) => {
    setResponseData(data);
    setShowStatsPage(true);
  };

  const handleCloseStatsPage = () => {
    setShowStatsPage(false);
    setResponseData(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>StreetSense</h1>
      </header>
      <div className="content-container">
        <div className="map-container">
          <LocationInput updateMap={setSelectedBorough} map={map} />
          <Map ref={mapRef} location={selectedBorough} />
        </div>
        <div className="form-container">
          <UserForm onSuccessfulSubmit={handleSuccessfulSubmit} />
        </div>
      </div>
      {showStatsPage && <StatsPage data={responseData} onClose={handleCloseStatsPage} />}
    </div>
  );
}

export default App;
