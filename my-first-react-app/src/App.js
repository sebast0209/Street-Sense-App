import React, { useState, useRef } from 'react';
import './App.css';
import LocationInput from './LocationInput';
import Map from './Map';

function App() {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [selectedBorough, setSelectedBorough] = useState(''); // Initialize selected borough state

  const setMapInstance = (googleMap) => {
    setMap(googleMap);
  };

  return (
    <div className="App">
      <h1>StreetSense</h1>
      <LocationInput updateMap={setSelectedBorough} map={map} />
      <Map ref={mapRef} location={selectedBorough} />
    </div>
  );
}

export default App;
