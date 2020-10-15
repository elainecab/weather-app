function formatDate(timestamp){
    let date = new Date(timestamp);
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let day = days[date.getDay()];

    return `${day} ${formatTime(timestamp)}`;
}

function formatTime(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
        if(hours < 10){
            hours = `0${hours}`;
            }
    let minutes = date.getMinutes();
        if(minutes < 10){
            minutes = `0${minutes}`;
            }
    return `${hours}:${minutes}`;
}

function showTemperature(response){
    let temperatuteElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let sensationElement = document.querySelector("#sensation");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    celsiusTemperature = response.data.main.temp;
    
    temperatuteElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    sensationElement.innerHTML = Math.round(response.data.main.feels_like);
    humidityElement.innerHTML = Math.round(response.data.main.humidity);
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute(
        "src", 
        `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
        );
}

function showForecast(response){
    let forecastElement = document.querySelector("#forecast-weather");
    forecastElement.innerHTML = null;
    let forecast = null;
    
    for (let index = 0; index < 6; index++) {
        forecast = response.data.list[index];
        forecastElement.innerHTML += `
        <div class="col-2">
            <h5 class="day">${formatTime(forecast.dt * 1000)}</h5>
            <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
                class="day-icon">
            <div class="forecast-temperature">
                <h6 class="day-temp"> ${Math.round(forecast.main.temp_max)}º | 
                    <span class="forecast-degrees">${Math.round(forecast.main.temp_min)}º</span>
                </h6>
            </div>
        </div>
    `
    }
}

function search(city){
    let apiKey = "a923e76b795634a6870a9f9aaf2bbb9a";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showForecast);
}

function submiting(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function showInFahrenheit(event){
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitDegrees = (celsiusTemperature * 9) / 5 + 32;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitDegrees);
}

function showIncelsius(event){
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", submiting);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showInFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showIncelsius);

search("Pembroke Pines");