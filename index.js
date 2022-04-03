let apiKey = "e324f15108fc425fee3a8dc4306d1b4e";

function getFormattedDate() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let dateIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (minutes < 10) {
    formattedMins = `0${minutes}`;
  } else {
    formattedMins = minutes;
  }
  return `${days[dateIndex]} ${hours}:${formattedMins}`;
}

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityProvided = document.querySelector("#city-input");
  cityElement.innerHTML = cityProvided.value;
}

function convert2f(event) {
  event.preventDefault();
  let tempElement = document.getElementById("temperature");
  let temperature = tempElement.innerHTML;
  console.log(temperature);
  tempElement.innerHTML = Math.round((Number(temperature) * 9) / 5 + 32);
}

// date time
let dateElement = document.getElementById("date_tbd");
dateElement.innerHTML = getFormattedDate();
// temp
let tempFLink = document.querySelector("#tempF-link");
tempFLink.addEventListener("click", convert2f);

//feature 2
let cityInputElement = document.querySelector("#city-input-form");
cityInputElement.addEventListener("submit", search);

function showCityWeather(response) {
  console.log(response.data.main);

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#humidity"
  ).innerHTML = `humidity:${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind:${Math.round(
    response.data.wind.speed
  )}km/h`;
  document.querySelector(
    "#description"
  ).innerHTML = `${response.data.weather[0].main}`;
}

function searchCity(event) {
  event.preventDefault();

  let apikey = "324f15108fc425fee3a8dc4306d1b4e";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

  axios.get(apiUrl).then(showCityWeather);
}
let searchForm = document.querySelector("#city-input-form");
searchForm.addEventListener("submit", searchCity);

function showCurrentpositionTemp(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let currentTemp = Math.round(response.data.main.temp);
  let Ctemp = document.querySelector("#changeTemp");
  Ctemp.innerHTML = `${currentTemp}`;
}

function currentTemperature(position) {
  let apikey = "e324f15108fc425fee3a8dc4306d1b4e";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let geoApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;

  axios.get(geoApi).then(showCurrentpositionTemp);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentTemperature);
}
navigator.geolocation.getCurrentPosition(currentTemperature);
let currentSearch = document.querySelector("#current-location-button");

currentSearch.addEventListener("click", getPosition);
