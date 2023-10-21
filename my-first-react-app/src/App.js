import logo from './logo.svg';
import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import Map from './Map';
import LocationInput from './LocationInput';

function App() {
  const [map, setMap] = useState(null);
  const mapRef = useRef();

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
      <h1>Interactive Google Map</h1>
      <LocationInput updateMap={setMapInstance} />
      <Map ref={mapRef} />
    </div>
  );
}

export default App; // This should be the only export default statement
