function formatDate(timestamp) {
let date = new Date (timestamp);
let hours = date.getHours();
if (hours < 10) {
hours = `0${hours}`;
}

let minutes = date.getMinutes();
if (minutes < 10){
minutes = `0${minutes}`;
}

let days = [
     "Sun",
     "Mon", 
     "Tue", 
     "Wed", 
     "thu", 
     "fri", 
     "Sat"
    ];

let day = days [date.getDay()];

return `${day} ${hours}:${minutes}`;
}









function displayTemp(response){

let temperatureElement = document.querySelector("#temperature");
let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let feelsLikeElement = document.querySelector("#feels-like");
let windElement = document.querySelector("#wind");
let dateElement = document.querySelector("#date");
let iconElement = document.querySelector("#icon");

celsiusTemp = response.data.main.temp;



temperatureElement.innerHTML = Math.round (celsiusTemp);
cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description;
humidityElement.innerHTML = response.data.main.humidity;
feelsLikeElement.innerHTML = Math.round (response.data.main.feels_like);
windElement.innerHTML = Math.round (response.data.wind.speed);
dateElement.innerHTML = formatDate(response.data.dt * 1000);
iconElement.setAttribute("src", 
`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt", response.data.weather[0].description);

}


function search(city){
    
let apiKey = "c898564bae75feba5b1af523cf4a1211";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemp);

}

function handleSubmit(event) {
event.preventDefault();
let cityInputElement = document.querySelector("#city-input");
search(cityInputElement.value);
}


function displayFahrenheitTemp(event) {
event.preventDefault();
let temperatureElement = document.querySelector("#temperature");
celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");
let fahrenheitTemp = (celsiusTemp * 9) /5 + 32;

temperatureElement.innerHTML = Math.round (fahrenheitTemp);

}


function displayCelsiusTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.add("active");
fahrenheitLink.classList.remove("active");
    temperatureElement.innerHTML = Math.round (celsiusTemp);
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);


search("Oslo");
