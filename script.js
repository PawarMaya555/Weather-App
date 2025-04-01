let apiKey = "960793b0eb5bc517010119fa91368994";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherImg = document.querySelector(".WeatherImg");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`); // fetch url data

  //  check city name is not correct then show error msg if(error)
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block"; // error show
    document.querySelector(".weatherData").style.display = "none"; // data not dispaly
  }
  // Show All data.. else(not error)
  else {
    let data = await response.json(); // data format json()

    // console.log(data); // data show console in formata way
    // Data show in html Element fetch on api
    document.querySelector("#city").innerHTML = data.name;
    document.querySelector("#temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".windValue").innerHTML = data.wind.speed + " Km/h";

    // update img for the differnt mosum
    if (data.weather[0].main == "Clouds") {
      weatherImg.src = "clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherImg.src = "clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherImg.src = "rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherImg.src = "drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherImg.src = "mist.png";
    }
    // wheaterData Display
    document.querySelector(".weatherData").style.display = "block"; // data display
    document.querySelector(".error").style.display = "none"; // error msg Hidden
  }
}
// checkWeather using Enter key press
searchBox.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault(); // Prevent form submit
    const dataDisplay = searchBox.value;
    checkWeather(dataDisplay); // Trigger the search on Enter
  }
  // console.log(e);
});
// checkWeather using Btn click;
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
