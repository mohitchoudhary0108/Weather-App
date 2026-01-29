require('dotenv').config(); // Should be at the very top

// Import the express library
const express = require('express');
// Import axios for making HTTP requests
const axios = require('axios'); // Ensure this line is present

// Create an instance of the express application
const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define the port the server will listen on
const PORT = process.env.PORT || 3000;

// Define your OpenWeatherMap API base URL and API key
const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const OPENWEATHERMAP_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// API endpoint to get weather data for a city
app.get('/api/weather', async (req, res) => {
    const city = req.query.city; // Get city from query parameters (e.g., /api/weather?city=London)

    if (!city) {
        return res.status(400).json({ message: 'City parameter is required.' });
    }

    if (!OPENWEATHERMAP_API_KEY) {
        console.error('OPENWEATHERMAP_API_KEY is not set in environment variables.');
        return res.status(500).json({ message: 'Server configuration error: API key missing.' });
    }

    try {
        const response = await axios.get(OPENWEATHERMAP_BASE_URL, {
            params: {
                q: city,
                appid: OPENWEATHERMAP_API_KEY,
                units: 'metric' // or 'imperial' for Fahrenheit
            }
        });

        const weatherData = {
            city: response.data.name,
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon
        };

        res.json(weatherData);

    } catch (error) {
        console.error('Error fetching weather data:', error.message);

        if (error.response) {
            if (error.response.status === 404) {
                return res.status(404).json({ message: 'City not found.' });
            } else if (error.response.status === 401) {
                return res.status(401).json({ message: 'Invalid API key or API key not active.' });
            } else {
                return res.status(error.response.status).json({ message: 'Error from weather API.' });
            }
        } else if (error.request) {
            return res.status(500).json({ message: 'No response from weather API. Network error?' });
        } else {
            return res.status(500).json({ message: 'An unexpected error occurred.' });
        }
    }
});

// The original basic route for the root URL ("/") - Keep this for now
app.get('/', (req, res) => {
    res.send('Hello from your Express.js server!');
});

// Start the server and listen for incoming requests
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Open your browser to http://localhost:${PORT}`);
});