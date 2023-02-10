function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class= "row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-2">
        <div class="col"> ${formatDay(forecastDay.time)} </div> 
        <img
        src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
          forecastDay.condition.icon
        }.png"
        width="42" />
    <div class="col" id="weather-forecast-temp">
      <span> ${Math.round(forecastDay.temperature.maximum)}℃ </span>
      <br/>
      <span>${Math.round(forecastDay.temperature.minimum)}℃</span>
    </div>
  </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5c0fbb0ef63ff3a8dac04t35bo0ed1e4";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temp");
  celciusTemp = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(celciusTemp);
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity + "%";
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed) + "km/hr";
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", response.data.condition.icon_url);

  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "5c0fbb0ef63ff3a8dac04t35bo0ed1e4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSearch(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSearch);

function displayCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  farenLink.classList.add("active");
  celciusLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celciusTemp);
}

let celciusTemp = null;

let celciusLink = document.querySelector("#celcius-unit");
celciusLink.addEventListener("click", displayCelcius);

function displayFaren(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  celciusLink.classList.add("active");
  farenLink.classList.remove("active");
  let farenTemp = (celciusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenTemp);
}

let farenLink = document.querySelector("#faren-unit");
farenLink.addEventListener("click", displayFaren);

search("Tokyo");

displayForecast();
