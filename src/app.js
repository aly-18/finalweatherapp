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
}
let apiUrl =
  "https://api.shecodes.io/weather/v1/current?query=Melbourne&key=5c0fbb0ef63ff3a8dac04t35bo0ed1e4&units=metric";

console.log(apiUrl);

axios.get(apiUrl).then(displayTemperature);
