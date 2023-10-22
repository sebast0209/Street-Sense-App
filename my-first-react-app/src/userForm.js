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

        console.log(formData.borough);
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
            const response = await axios.post('http://127.0.0.1:5000/upload', payload);
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
                <option value="FEMALE">FEMALE</option>
                <option value="MALE">MALE</option>
                <option value="DECLINE TO STATE">DECLINE TO STATE</option>
                <option value="NON BINARY/OTHER">NON BINARY/OTHER</option>
                <option value="UNKNOWN">UNKNOWN</option>
                <option value="LGBTQ+">LGBTQ+</option>
            </select>
        </div>

        <div>
            <label htmlFor="race">Ethnicity:</label>
            <select
                id="race"
                name="race"
                value={formData.race}
                onChange={handleChange}

            >
                <option value="">Select Ethnicity</option>
                <option value="BLACK">BLACK</option>
                <option value="WHITE">WHITE</option>
                <option value="WHITE HISPANIC">WHITE HISPANIC</option>
                <option value="BLACK HISPANIC">BLACK HISPANIC</option>
                <option value="ASIAN/PACIFIC ISLANDER">ASIAN/PACIFIC ISLANDER</option>
                <option value="AMERICAN INDIAN/ALASKAN NATIVE">AMERICAN INDIAN/ALASKAN NATIVE</option>
                <option value="UNKNOWN">UNKNOWN</option>
                <option value="OTHER">OTHER</option>
            </select>
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
                <option value="">Select Borough</option>
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