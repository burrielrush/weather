const apiKey = 'ae76deb401fd46ce9c712434230204';
const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=`;

const searchButton = document.querySelector('.search');
const searchInput = document.querySelector('input[type="text"]');
const cityName = document.querySelector('.city-name');
const temperature = document.querySelector('.temperature');
const week = document.querySelector('.week');
const searchHistoryList = document.querySelector('.search-history');
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity');


let searchHistory = [];

function displaySearchHistory() {
  searchHistoryList.innerHTML = '';
  searchHistory.forEach(city => {
    const searchHistoryItem = document.createElement('li');
    searchHistoryItem.textContent = city;
    searchHistoryItem.addEventListener('click', () => {
      searchInput.value = city;
      searchButton.click();
    });
    searchHistoryList.appendChild(searchHistoryItem);
  });
}

searchButton.addEventListener('click', () => {
  const city = searchInput.value.trim();

  if (city) {
  fetch(`${apiUrl}${city}&forecast_days=7`)
  .then(response => response.json())
  .then(data => {
    const currentWeather = data.current;
    const forecastWeather = data.forecast.forecastday; // add this line
    cityName.textContent = data.location.name;
    temperature.textContent = `${currentWeather.temp_f}°F`;
    wind.textContent = `${currentWeather.wind_mph} mph`;
    humidity.textContent = `${currentWeather.humidity} % Humidity`;

    // Display five-day forecast
    week.innerHTML = ''; // clear previous forecast data
    forecastWeather.forEach(day => {
      const forecastItem = document.createElement('div');
      forecastItem.classList.add('forecast-item');
      forecastItem.innerHTML = `
        <div class="day">${day.date}</div>
        <div class="temp">${day.day.avgtemp_f}°F</div>
        <div class="description">${day.day.condition.text}</div>
      `;
      week.appendChild(forecastItem);
    });

    // Save searched city in search history
    if (!searchHistory.includes(data.location.name)) {
      searchHistory.push(data.location.name);
      displaySearchHistory();
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });

  }
});

displaySearchHistory();

console.log(wind)




