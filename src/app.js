function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = date.getDay();
  return day + hours + minutes;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity + "%";
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed) + "km/hr";
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.time);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", response.data.condition.icon_url);
}

function handleSearch(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  console.log(cityInputElement.value);
}

let apiUrl =
  "https://api.shecodes.io/weather/v1/current?query=hawthorn&key=5c0fbb0ef63ff3a8dac04t35bo0ed1e4&units=metric";

console.log(apiUrl);

axios.get(apiUrl).then(displayTemperature);

let form = document.querySelector("form");
form.addEventListener("submit", handleSearch);
