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
    const { updateMap } = this.props;
    const { location } = this.state;
    
    if (location) {
      updateMap(location); // Pass the location to the updateMap function
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
