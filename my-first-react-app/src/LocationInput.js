import React, { Component } from 'react';

class LocationInput extends Component {
  constructor() {
    super();
    this.state = {
      selectedBorough: '', // Initialize the selected borough state
    };
  }

  handleSelectChange = (e) => {
    this.setState({ selectedBorough: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { updateMap } = this.props;
    const { selectedBorough } = this.state;

    if (selectedBorough) {
      updateMap(selectedBorough); // Pass the selected borough to the updateMap function
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <select
          value={this.state.selectedBorough}
          onChange={this.handleSelectChange}
        >
          <option value="">Select a borough</option>
          <option value="staten_island">Staten Island</option>
          <option value="brooklyn">Brooklyn</option>
          <option value="queens">Queens</option>
          <option value="bronx">Bronx</option>
          <option value="manhattan">Manhattan</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default LocationInput;
