document.addEventListener('DOMContentLoaded', () => {
    const locationInput = document.getElementById('locationInput');
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    const weatherResult = document.getElementById('weatherResult');

    getWeatherBtn.addEventListener('click', async () => { // Made the function async
        const location = locationInput.value.trim();
        if (!location) {
            weatherResult.innerHTML = '<p style="color: red;">Please enter a city name.</p>';
            return; // Stop if no location
        }

        weatherResult.innerHTML = `<p>Fetching weather for ${location}...</p>`;

        try {
            // Make a request to our own backend API endpoint
            const response = await fetch(`/api/weather?city=${encodeURIComponent(location)}`);
            const data = await response.json(); // Parse the JSON response

            if (response.ok) { // Check if the HTTP status code is 2xx
                // Display the weather data
                weatherResult.innerHTML = `
                    <h2>${data.city}</h2>
                    <p>Temperature: ${data.temperature}°C</p>
                    <p>Description: ${data.description}</p>
                    <img src="http://openweathermap.org/img/wn/${data.icon}.png" alt="Weather icon">
                `;
            } else {
                // Handle errors from our backend
                weatherResult.innerHTML = `<p style="color: red;">Error: ${data.message || 'Could not fetch weather data.'}</p>`;
            }

        } catch (error) {
            // Handle network errors or other unexpected issues
            console.error('Error fetching weather data from backend:', error);
            weatherResult.innerHTML = '<p style="color: red;">An unexpected error occurred while fetching weather.</p>';
        }
    });
});