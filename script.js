function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let speed = document.querySelector("#speed");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  speed.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "a923e76b795634a6870a9f9aaf2bbb9a";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=Pembroke Pines&appid=${apiKey}&units=imperial`;

axios.get(apiURL).then(displayTemperature);
