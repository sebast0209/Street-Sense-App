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
      this.resetToDefaultZoom(); // Reset the zoom level to 11
      this.setMapLocation(this.props.location || 'default'); // Set the new location
    }
  }

  initMap() {
    // Create a new map instance and set its properties
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: this.getDefaultCenter(),
      zoom: 11,
      minZoom: 11, // Set a minimum zoom level
      maxZoom: 12.5, // Set a maximum zoom level
    });

    this.map = map; // Store a reference to the map object
  }

  setMapLocation(location) {
    if (location.toLowerCase() === 'queens') {
      this.map.setCenter({ lat: 40.7282, lng: -73.7949 });
      this.map.setZoom(12.5); // Set an appropriate zoom level for Queens
    } else if (location.toLowerCase() === 'bronx') {
      this.map.setCenter({ lat: 40.8448, lng: -73.8648 });
      this.map.setZoom(12.5);
    } else if (location.toLowerCase() === 'manhattan') {
      this.map.setCenter({ lat: 40.7831, lng: -73.9712 });
      this.map.setZoom(12.5);
    } else if (location.toLowerCase() === 'staten_island') {
      this.map.setCenter({ lat: 40.5795, lng: -74.1502 });
      this.map.setZoom(12.5);
    } else if (location.toLowerCase() === 'brooklyn') {
      this.map.setCenter({ lat: 40.6782, lng: -73.9442 });
      this.map.setZoom(12.5);
    } else {
      // Reset the map to the default New York coordinates
      this.map.setCenter(this.getDefaultCenter());
      this.map.setZoom(11);
    }
  }

  resetToDefaultZoom() {
    // Reset the map to the default New York zoom level (zoom 11)
    this.map.setZoom(11);
  }

  getDefaultCenter() {
    return { lat: 40.7128, lng: -74.0060 }; // Default to New York City coordinates
  }

  render() {
    return <div id="map" style={{ width: '100%', height: '800px' }} />;
  }
}

export default Map;
