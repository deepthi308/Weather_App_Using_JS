const API_KEY = "676a1bae22724f519ba172124241808";
const API_URL =
  "https://api.weatherapi.com/v1/current.json?key=676a1bae22724f519ba172124241808&aqi=yes&q=";

// Getting the HTML elements reference using DOM
let searchInputEl = document.getElementById("search-input");
let searchButtonEl = document.getElementById("search-button");
let cloudImageEl = document.getElementById("cloud-img");
let celsiusEl = document.getElementById("celsius");
let cityEl = document.getElementById("city");
let humidityEl = document.getElementById("humidity");
let windSpeedEl = document.getElementById("wind-speed-no");

async function fetchWhetherData(url) {
  try {
    let response = await fetch(url);
    let data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log("Error while fetching whether data");
  }
}

function displayWhetherDataOnUI(weatherData) {
  cityEl.innerText = weatherData.location.name;
  cloudImageEl.src = "https:" + weatherData.current.condition.icon;
  celsiusEl.innerText = weatherData.current.temp_c;
  humidityEl.innerText = weatherData.current.humidity;
  windSpeedEl.innerText = weatherData.current.wind_kph;
}

// This function will be triggered on click of the search button or when we click on enter
async function handleSearch(e) {
  if (e.code === "Enter" || e.code === undefined) {
    let cityName = searchInputEl.value.trim();
    if (cityName) {
      const URL = `${API_URL}${cityName}`;
      let whetherData = await fetchWhetherData(URL);
      displayWhetherDataOnUI(whetherData);
    }
  }
}

// Attaching event handler to the search input
searchInputEl.addEventListener("keydown", handleSearch);
// Attaching event handler to the search button
searchButtonEl.addEventListener("click", handleSearch);
