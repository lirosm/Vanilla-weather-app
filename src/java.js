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
console.log(response.data);

let temperatureElement = document.querySelector("#temperature");
let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let feelsLikeElement = document.querySelector("#feels-like");
let windElement = document.querySelector("#wind");
let dateElement = document.querySelector("#date");
temperatureElement.innerHTML = Math.round (response.data.main.temp);
cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description;
humidityElement.innerHTML = response.data.main.humidity;
feelsLikeElement.innerHTML = Math.round (response.data.main.feels_like);
windElement.innerHTML = Math.round (response.data.wind.speed);
dateElement.innerHTML = formatDate(response.data.dt * 1000);
}








let apiKey = "c898564bae75feba5b1af523cf4a1211";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Oslo&appid=${apiKey}&units=metric`;


axios.get(apiUrl).then(displayTemp);
