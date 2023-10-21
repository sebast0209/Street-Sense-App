import React, { Component } from 'react';

class Map extends Component {
  componentDidMount() {
    this.initMap();
  }

  initMap() {
    // Create a new map instance and set its properties
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 0, lng: 0 }, // Default center
      zoom: 8, // Default zoom level
    });

    // You can add markers, controls, and other interactive elements here
  }

  render() {
    return <div id="map" style={{ width: '100%', height: '400px' }} />;
  }
}

export default Map;
