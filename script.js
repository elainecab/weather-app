function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
}

let apiKey = "a923e76b795634a6870a9f9aaf2bbb9a";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=Pembroke Pines&appid=${apiKey}&units=imperial`;

axios.get(apiURL).then(displayTemperature);
