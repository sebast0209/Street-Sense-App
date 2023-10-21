import React, { Component } from 'react';

class Map extends Component {
  constructor() {
    super();
    this.state = {
      location: '', // Initialize the location state
    };
  }

  componentDidMount() {
    this.initMap();
    this.setMapLocation(this.props.location || 'default'); // Provide a default value
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.setMapLocation(this.props.location || 'default'); // Provide a default value
    }
  }

  initMap() {
    // Create a new map instance and set its properties
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: this.getDefaultCenter(),
      zoom: 11,
    });

    this.map = map; // Store a reference to the map object
  }

  setMapLocation(location) {
    console.log("ZOOM");

    if (location.toLowerCase() === 'queens') {
      this.map.setCenter({ lat: 40.742054, lng: -73.769417 });
      this.map.setZoom(12.5); // Set an appropriate zoom level for Queens
    } else {
      // Reset the map to the specified coordinates
      this.map.setCenter({ lat: 40.735657, lng: -74.172363 });
      this.map.setZoom(12.5);
    }
  }

  getDefaultCenter() {
    return { lat: 40.7128, lng: -74.0060 }; // Default to New York City coordinates
  }

  render() {
    return <div id="map" style={{ width: '100%', height: '800px' }} />;
  }
}

export default Map;
