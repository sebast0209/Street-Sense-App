import React, { useState, useRef } from 'react'; // Import useState and useRef
import './App.css';
import LocationInput from './LocationInput'; // Import LocationInput component
import Map from './Map'; // Import Map component
import logo from './logo.svg';

function App() {
  const mapRef = useRef();
  const [map, setMap] = useState(null);

  const setMapInstance = (googleMap) => {
    setMap(googleMap);
  };

  // Set a location variable here based on user input
  var location = 'queens'; // You should set this based on the user's input

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
      <LocationInput updateMap={setMapInstance} map={map} />
      <Map ref={mapRef} location={location} />
    </div>
  );
}

export default App;
