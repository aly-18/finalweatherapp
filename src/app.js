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
  if (hours < 12) {
    hours = "0" + hours;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return day + " " + hours + ":" + minutes;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temp");
  celciusTemp = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(celciusTemp);
  let cityElement = document.querySelector("#city");
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
}

function search(city) {
  let apiUrl =
    "https://api.shecodes.io/weather/v1/current?query=Melbourne&key=5c0fbb0ef63ff3a8dac04t35bo0ed1e4&units=metric";
  console.log(apiUrl);
  axios.get(apiUrl).then(displayTemperature);
}
search("Paris");

function handleSearch(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  console.log(cityInputElement.value);
}

let form = document.querySelector("#searchButton");
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
