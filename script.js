const weatherEl = document.getElementById('weather')
const form = document.querySelector('form');

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
  
  function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
  
    getWeather(lat, lon);
  }
  
  function error(error) {
    console.log("Error occurred while retrieving location:", error.message);

  }
  
  async function getWeather(lat, lon, units = 'celc') {
    const apiKey = '90cbf95ce9254de4af2131500232010'
    let apiUrl;
    if (typeof lat === 'string') {
        apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat}&aqi=no`;
    } else {
    apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`;
    }

    try {
        let response = await fetch(apiUrl)
        let weatherData = await response.json()
        insertWeather(weatherData, units)
    }
    catch(err) {
        console.log(err)
    }
  }

  function insertWeather(data, units) {
    const weatherCondition = data.current.condition.text.toLowerCase();
    const isDay = data.current.is_day;
    const country = data.location.country
    const city = data.location.name
    const icon = data.current.condition.icon
    const temperature = units === 'celc' ? `${Math.floor(data.current.temp_c)} <span id='degree'>°C</span>` : `${Math.floor(data.current.temp_f)} <span id='degree'>°F</span>` 

    form.elements.city.placeholder = city + '...'

    weatherEl.innerHTML = `
    <div id='temperature'><img src='${icon}'>${temperature}</div>
    <div class='location'>${country},</div>
    <div class='location'>${city}</div>
    `

    changeBackground(weatherCondition, isDay)
  }


  document.addEventListener('submit', e => {
    e.preventDefault()
    const city = form.elements.city.value;
    const units = form.elements.temperature.value;

    getWeather(city, null, units);
  })


  function changeBackground(weatherCondition, isDay) {
    const body = document.querySelector('body');
    let imageUrl;
  
    if (weatherCondition.includes('rain') || weatherCondition.includes('overcast')) {
      if (isDay) {
        imageUrl = 'day_rain.jpg';
      } else {
        imageUrl = 'night_rain.jpg';
      }
    } else if (weatherCondition.includes('sunny') || weatherCondition.includes('clear')) {
      if (isDay) {
        imageUrl = 'day_sunny.jpg';
      } else {
        imageUrl = 'night_clear.jpg';
      }
    } else if (weatherCondition.includes('cloudy')) {
      if (isDay) {
        imageUrl = 'day_cloudy.jpg';
      } else {
        imageUrl = 'night_cloudy.jpg';
      }
    } else {
      imageUrl = 'default.jpg';
    }
  
    body.style.backgroundImage = `url(${imageUrl})`;
  }
  
  
  
  






  

