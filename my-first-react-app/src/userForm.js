import React, { useState } from 'react';
import axios from 'axios';
import './userForm.css';

function UserForm({ onSuccessfulSubmit }) {

    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        race: '',
        timeOfDeparture: '',
        borough: ''
    });

    const boroughCoordinates = {
        "Brooklyn": { latitude: 40.650002, longitude: -73.949997 },
        "Bronx": { latitude: 40.837048, longitude: -73.865433 },
        "Manhattan": { latitude: 40.776676, longitude: -73.971321 },
        "Queens": { latitude: 40.742054, longitude: -73.769417 },
        "Staten Island": { latitude: 40.579021, longitude: -74.151535 }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Fetch the coordinates based on selected borough
        const { latitude, longitude } = boroughCoordinates[formData.borough];

        // Prepare the payload for the backend
        const payload = {
            ...formData,
            latitude,   // Include the latitude
            longitude   // Include the longitude
        };

        delete payload.borough;

        try {
            const response = await axios.post('http://your-backend-url/endpoint', payload);
            console.log('Data sent successfully:', response.data);
            
            // Use the callback to signal that the submission was successful
            onSuccessfulSubmit(response.data);

        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    return (
        <div className="form-container">
        <form onSubmit={handleSubmit}>

        <div>
            <label htmlFor="age">Age:</label>
            <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
            />
        </div>

        <div>
            <label htmlFor="gender">Gender:</label>
            <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
            >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
        </div>

        <div>
            <label htmlFor="race">Race:</label>
            <input
                type="text"
                id="race"
                name="race"
                value={formData.race}
                onChange={handleChange}
            />
        </div>

        <div>
            <label htmlFor="timeOfDeparture">Time of Departure:</label>
            <input
                type="time"
                id="timeOfDeparture"
                name="timeOfDeparture"
                value={formData.timeOfDeparture}
                onChange={handleChange}
            />
        </div>

        <div>
            <label htmlFor="borough">Borough:</label>
            <select
                id="borough"
                name="borough"
                value={formData.borough}
                onChange={handleChange}
            >
                <option value="Brooklyn">Brooklyn</option>
                <option value="Bronx">Bronx</option>
                <option value="Manhattan">Manhattan</option>
                <option value="Queens">Queens</option>
                <option value="Staten Island">Staten Island</option>
            </select>
        </div>

        <button type="submit">Submit</button>
    </form>

    </div>
    );
}

export default UserForm;