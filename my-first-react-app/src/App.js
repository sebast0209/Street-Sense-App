// this is app.js

import React, { useState, useRef } from 'react';
import './App.css';
import LocationInput from './LocationInput';
import Map from './Map';
import logo from './logo.svg';

function App() {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [selectedBorough, setSelectedBorough] = useState(''); // Initialize selected borough state

  const setMapInstance = (googleMap) => {
    setMap(googleMap);
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
    </div>
  );
}

export default App;
