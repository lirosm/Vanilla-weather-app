function displayTemp(response){
console.log(response.data);

let temperatureElement = document.querySelector("#temperature");
let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let feelsLikeElement = document.querySelector("#feels-like");
let windElement = document.querySelector("#wind");
temperatureElement.innerHTML = Math.round (response.data.main.temp);
cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description;
humidityElement.innerHTML = response.data.main.humidity;
feelsLikeElement.innerHTML = Math.round (response.data.main.feels_like);
windElement.innerHTML = Math.round (response.data.wind.speed);

}








let apiKey = "c898564bae75feba5b1af523cf4a1211";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Oslo&appid=${apiKey}&units=metric`;


axios.get(apiUrl).then(displayTemp);
