const apiKey = 'b8225c6b3a0bd6ed286523eebf471fb6'; // Replace with your OpenWeatherMap API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';

function getWeather() {
    const cityInput = document.getElementById('city');
    const cityName = cityInput.value.trim();

    if (cityName !== '') {
        const currentWeatherContainer = document.getElementById('current-weather');
        const forecastContainer = document.getElementById('forecast');

        fetch(`${apiUrl}?q=${cityName}&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                displayCurrentWeather(data, currentWeatherContainer);
            })
            .catch(error => {
                console.error('Error fetching current weather:', error);
                currentWeatherContainer.innerHTML = 'Error fetching current weather';
            });

        fetch(`${forecastUrl}?q=${cityName}&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                displayForecast(data, forecastContainer);
            })
            .catch(error => {
                console.error('Error fetching forecast:', error);
                forecastContainer.innerHTML = 'Error fetching forecast';
            });
    }
}

function displayCurrentWeather(data, container) {
    container.innerHTML = `<h2>${data.name}, ${data.sys.country}</h2>
                           <p>Temperature: ${(data.main.temp - 273.15).toFixed(2)}°C</p>
                           <p>Weather: ${data.weather[0].description}</p>
                           <p>Humidity: ${data.main.humidity}%</p>`;
}

function displayForecast(data, container) {
    container.innerHTML = '<h2>5-Day Forecast</h2>';

    for (let i = 0; i < data.list.length; i += 8) {
        const forecastItem = data.list[i];
        const date = new Date(forecastItem.dt * 1000);

        container.innerHTML += `<div>
                                   <p>Date: ${date.toDateString()}</p>
                                   <p>Temperature: ${(forecastItem.main.temp - 273.15).toFixed(2)}°C</p>
                                   <p>Weather: ${forecastItem.weather[0].description}</p>
                                   <p>Humidity: ${forecastItem.main.humidity}%</p>
                                </div>`;
    }
}


function displayCurrentWeather(data, container) {
    const weatherIconCode = data.weather[0].icon;
    const weatherIconUrl = `http://openweathermap.org/img/w/${weatherIconCode}.png`;

    container.innerHTML = `<h2>${data.name}, ${data.sys.country}</h2>
                           <img src="${weatherIconUrl}" alt="Weather Icon">
                           <p>Temperature: ${(data.main.temp - 273.15).toFixed(2)}°C</p>
                           <p>Weather: ${data.weather[0].description}</p>
                           <p>Humidity: ${data.main.humidity}%</p>`;
}
