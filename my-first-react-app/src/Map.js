import React, { Component } from 'react';

class Map extends Component {
  componentDidMount() {
    this.initMap();
  }

  initMap() {
    // Create a new map instance and set its properties
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 40.7128, lng: -74.0060 }, // New York City coordinates
      zoom: 11, // Zoom level to focus on New York
    });
  
    // You can add markers, controls, and other interactive elements here
  }

  render() {
    return <div id="map" style={{ width: '100%', height: '800px' }} />;
  }
}

export default Map;
