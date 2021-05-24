import React from "react";
import WeatherSearch from "./WeatherSearch.js";
import "./styles.css";


export default function App() {
  return (
    <div className="App">
      <h1>Weather search Engine</h1>
      <WeatherSearch />
     
    </div>
  );
}


import React, { useState } from "react";

export default function WeatherSearch() {
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setMessage(`It is currently 20°C in ${city}`);
  }

  function changeCity(event) {
    setCity(event.target.value);
  }

  return (
    <div className="WeatherSearch">
      <form onSubmit={handleSubmit}>
        <input type="search" placeholder="Type a city" onChange={changeCity} />
        <input type="submit" value="Search" />
      </form>
      <h2>{message}</h2>
    </div>
  );
}




import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);






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
     "Sunday",
     "Monday", 
     "Tuesday", 
     "Wednesday", 
     "Thursday", 
     "Friday", 
     "Saturday"
    ];

let day = days [date.getDay()];

return `${day} ${hours}:${minutes}`;
}


function formatDay(timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = [
     "SUN",
     "MON", 
     "TUE", 
     "WED", 
     "THU", 
     "FRI", 
     "SAT"
    ];


return days[day];

}


function displayForecast(response) {

    let forecast= response.data.daily;

    let forecastElement = document.querySelector("#Forecast");


       let forecastHTML = `<div class="row">`;
     
       forecast.forEach(function(forecastDay, index) {
         if (index < 6) {
         forecastHTML = forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temp">
          <span class="weather-forecast-temp-max"> ${Math.round (forecastDay.temp.max)}°C |</span>
          <span class="weather-forecast-temp-min"> ${Math.round(forecastDay.temp.min)}°C </span>
        </div>
      </div>
  `;    
         }
       });
  
  

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
 
}

function getForecast(coordinates){
 

    let apiKey = "c898564bae75feba5b1af523cf4a1211";

    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`

    axios.get(apiUrl).then(displayForecast);
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

getForecast(response.data.coord);

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


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);


search("Oslo");

