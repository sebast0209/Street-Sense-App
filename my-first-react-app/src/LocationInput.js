import React, { Component } from 'react';

class LocationInput extends Component {
  constructor() {
    super();
    this.state = {
      location: '', // Initialize the location state
    };
  }

  handleInputChange = (e) => {
    this.setState({ location: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // Process the location here and update the map
    this.processLocation();
  }
  
  processLocation() {
    const location = this.state.location;
    const { updateMap } = this.props;
    
    if (location.toLowerCase() === 'queens') {
      console.log('QUEENS');
      updateMap(this.map);
       // Use the updateMap function to set the map
    } else {
      console.log('ZOOM 2');
      // Handle other locations or geocoding as needed
    }
  }
  

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Where are you going?"
          value={this.state.location}
          onChange={this.handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default LocationInput;
