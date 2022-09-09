const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const windSpeed = document.querySelector('.wind-speed');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');

city.addEventListener('change', getWeather);

async function getWeather() {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=50703c1fd25d7bab5601ad831d36b3d7&units=metric`
        const res = await fetch(url)
        const data = await res.json()

        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp}°C`;
        weatherDescription.textContent = data.weather[0].description;
        windSpeed.textContent = `Wind speed: ${data.wind.speed} m/s`;
        humidity.textContent = `Humidity: ${data.main.humidity} %`; 

        weatherError.textContent = ''
        weatherIcon.style.display = 'block';
        temperature.style.display = 'block';
        weatherDescription.style.display = 'block';
        windSpeed.style.display = 'block';
        humidity.style.display = 'block';
        
    } catch {
        city.value = '';
        weatherError.textContent = 'Error! Сity ​​not found'
        weatherIcon.style.display = 'none';
        temperature.style.display = 'none';
        weatherDescription.style.display = 'none';
        windSpeed.style.display = 'none';
        humidity.style.display = 'none';
    }
};


window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

function setLocalStorage() {
    localStorage.setItem('city', city.value)
}

function getLocalStorage() {
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city')
    }
    getWeather()
}