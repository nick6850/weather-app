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
    country = data.location.country
    city = data.location.name
    temperature = units === 'celc' ? `${data.current.temp_c} C` : `${data.current.temp_f} F` 

    weatherEl.innerHTML = `Country: ${country}
    City: ${city}
    Temperature: ${temperature}`
  }


  document.addEventListener('submit', e => {
    e.preventDefault()
    const city = form.elements.city.value;
    const units = form.elements.temperature.value;

    getWeather(city, null, units);
  })








  

