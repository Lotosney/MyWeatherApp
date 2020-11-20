const api = {
  key: "34061039c38a991c63ea314c2eb9dadf",
  base: "https://api.openweathermap.org/data/2.5/"
}
//adres i klucz api z open Weather
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(event) {
  if (event.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  polWeather = () => {
    if (weather.weather[0].main === "Clear") {
      return "Czyste Niebo"
    } else if (weather.weather[0].main === "Rain") {
      return "Deszczowo"
    } else if (weather.weather[0].main === "Mist") {
      return "Mgliście"
    } else if (weather.weather[0].main === "Clouds") {
      return "Pochmurno"
    } else if (weather.weather[0].main === "Thunderstorm") {
      return "Burza"
    }
  }
  weather_el.innerText = polWeather()  



  let highlow = document.querySelector('.high-low');
  highlow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder(d) {
  let months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
  let days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}