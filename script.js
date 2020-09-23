function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;

    if (hours < 11) {
      `${hours} am`;
    }
  } else {
    `${hours} pm`;
  }

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
  return `${day}, ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#speed");
  let currentDate = document.querySelector("#date");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  currentDate.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "a923e76b795634a6870a9f9aaf2bbb9a";
let city = "Paris";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

axios.get(apiURL).then(displayTemperature);
