import logo from './logo.svg';
import './App.css';
import React from 'react';
import Map from './Map';

function App() {
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
      <Map />
      {/* You can add user input fields here for location of interest */}
    </div>
    
  );
}

export default App;
