// Your OpenWeatherMap API Key
const API_KEY = 'bf17c160930dd32723940f7637a1d7fc';  // Replace with your actual API key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Function to fetch weather data

// Function to fetch weather data
async function getWeather(city) {
    showLoading();

    // Build the complete URL
const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;
    
    // Disable search button
    searchBtn.disabled = true;
    searchBtn.textContent = 'Searching...';

    // Make API call using Axios
    try {
        // Success! We got the data
        const response = await axios.get(url);
        console.log('Weather Data:', response.data);
        displayWeather(response.data);
    }
    catch (error) {
        // Something went wrong
        if (error.response && error.response.status === 404) {
            showError('City not found. Please check the name and try again.');
            console.error('Error fetching weather:', error);
        }
        else if (error.response) {
            // Server responded with a status other than 2xx
            showError(`Error: ${error.response.status} - ${error.response.data.message}`);
            console.error('Error fetching weather:', error);
        } 
        else if (error.request) {
            // Request was made but no response received
            showError('No response from server. Please check your network connection.');
            console.error('Error fetching weather:', error);
        } 
        else {
            showError('An error occurred while fetching weather data. Please try again later.');
            console.error('Error fetching weather:', error);
        }
    } finally {
        // Re-enable search button
        searchBtn.disabled = false;
        searchBtn.textContent = 'Search';
    }
}

// Function to display weather data
function displayWeather(data) {
    // Extract the data we need
    const cityName = data.name;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    
    // Create HTML to display
    const weatherHTML = `
        <div class="weather-info">
            <h2 class="city-name">${cityName}</h2>
            <img src="${iconUrl}" alt="${description}" class="weather-icon">
            <div class="temperature">${temperature}°C</div>
            <p class="description">${description}</p>
        </div>
    `;
    
    // Put it on the page
    document.getElementById('weather-display').innerHTML = weatherHTML;
}

// Function to display errors
function showError(message) {
    const errorHTML = `
    <div class="error-message">
        <strong>⚠️ <br> Error</strong> <br><br>
        ${message}
    </div>
    `;
    document.getElementById('weather-display').innerHTML = errorHTML;

}

const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (!city) {
        showError('Please enter a valid city name.');
        return;
    }
    if (city.length < 2) {
        showError('City name is too short. Please enter a valid city name.');
        return;
    }
    // Proceed with search
    getWeather(city);
});

cityInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const city = cityInput.value.trim();
        if (!city) {
            showError('Please enter a valid city name.');
            return;
        }
        if (city.length < 2) {
            showError('City name is too short. Please enter a valid city name.');
            return;
        }
        // Proceed with search
        getWeather(city);
    }
});

document.getElementById('weather-display').innerHTML = `
    <div class="welcome-message">
        <h2>Welcome to SkyFetch!</h2>
        <p>Enter a city name to get started!</p>
    </div>
`;

function showLoading() {
    const loadingHTML = `
    <div class="loading-container">
        <div class="spinner"></div>
        <p>Loading weather data...</p>
    </div>
    `;
    document.getElementById('weather-display').innerHTML = loadingHTML;
}

// Function to display weather data
function displayWeather(data) {
    // Extract the data we need
    const cityName = data.name;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    
    // Create HTML to display
    const weatherHTML = `
        <div class="weather-info">
            <h2 class="city-name">${cityName}</h2>
            <img src="${iconUrl}" alt="${description}" class="weather-icon">
            <div class="temperature">${temperature}°C</div>
            <p class="description">${description}</p>
        </div>
    `;
    
    // Put it on the page
    document.getElementById('weather-display').innerHTML = weatherHTML;
}

// Call the function when page loads
getWeather('London');
