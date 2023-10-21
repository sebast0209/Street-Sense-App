import React, { Component } from 'react';

class LocationInput extends Component {
  constructor() {
    super();
    this.state = {
      location: '', // Initialize the location state
      selectedArea: '', // To store the selected area
    };
  }

  handleInputChange = (e) => {
    this.setState({ location: e.target.value });
  }

  handleAreaChange = (e) => {
    this.setState({ selectedArea: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // Process the location and selected area here and update the map
    this.processLocation();
  }

  processLocation() {
    const location = this.state.location;
    const selectedArea = this.state.selectedArea;
    const { updateMap } = this.props;
    const geocoder = new window.google.maps.Geocoder();

    const fullLocation = `${location}, ${selectedArea}, New York, USA`;

    geocoder.geocode({ address: fullLocation }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const { location } = results[0].geometry;

        // Center and zoom the map on the geocoded location
        updateMap((map) => {
          if (map) {
            map.setCenter(location);
            map.setZoom(13); // You can adjust the zoom level as needed
            new window.google.maps.Marker({
              map,
              position: location,
              title: fullLocation,
            });
          }
        });
      } else {
        console.error('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Enter a location"
          value={this.state.location}
          onChange={this.handleInputChange}
        />
        <select
          value={this.state.selectedArea}
          onChange={this.handleAreaChange}
        >
          <option value="">Select an area</option>
          <option value="Manhattan">Manhattan</option>
          <option value="Brooklyn">Brooklyn</option>
          <option value="Queens">Queens</option>
          <option value="Bronx">Bronx</option>
          <option value="Staten Island">Staten Island</option>
          {/* Add more areas as needed */}
        </select>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default LocationInput;
