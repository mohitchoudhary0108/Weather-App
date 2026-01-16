document.addEventListener('DOMContentLoaded', () => {
    const locationInput = document.getElementById('locationInput');
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    const weatherResult = document.getElementById('weatherResult');

    getWeatherBtn.addEventListener('click', () => {
        const location = locationInput.value.trim();
        if (location) {
            weatherResult.innerHTML = `<p>Fetching weather for ${location}...</p>`;
            // In a later step, we will make an actual API call here
            console.log(`User requested weather for: ${location}`);
        } else {
            weatherResult.innerHTML = '<p style="color: red;">Please enter a city name.</p>';
        }
    });
});