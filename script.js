var cityInput = document.getElementById("city-input");
var searchBtn = document.getElementById("search-button");
var history = document.getElementById("history");
var cityName = document.getElementById("city-name");
var forecast = document.getElementById("forecast");
var currentTemp = document.getElementById("temp");
var currentHumidity = document.getElementById("humidity");
var currentWind = document.getElementById("wind-speed");
var currentUv = document.getElementById("uv-index");
var currentIcon = document.getElementById("current-icon");


var APIKey = "991a7002fd944fa8822ba79dd9d33faa";

function QueryURL() {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey + "&units=imperial";
}

function CurrentWeather(cityName) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey + "&units=imperial";
    $.ajax({
        type: "GET",
        url: queryURL,
        dataType: "json",
        success: function (response) {
            console.log(response);

            cityName.innerHTML = response.name + " (" + new Date().toLocaleDateString() + ")";
            currentIcon.setAttribute("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
            currentTemp.innerHTML = "Temp: " + response.main.temp + " &#176F";
            currentHumidity.innerHTML = "Humidity: " + response.main.humidity + "%";
            currentWind.innerHTML = "Wind Speed: " + response.wind.speed + " MPH";
            currentUv.innerHTML = "UV-Index: " + response.wind.speed + " ";
//API call for UV Index
            var lat = response.data.coord.lat;
            var lon = response.data.coord.lon;
            var UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
            $.ajax({
                type: "GET",
                url: queryURL,
                dataType: "json",
                success: function (response) {

                    var UVIndex = document.createElement("span");
                    UVIndex.setAttribute("class", "badge badge-danger");
                    UVIndex.innerHTML = response.data[0].value;
                    currentUVEl.innerHTML = "UV Index: ";
                    currentUVEl.append(UVIndex);
                }
            });

        }
    });
}
//End of UV Index
function Forecast(cityName) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey + "&units=imperial";
    $.ajax({
        type: "GET",
        url: queryURL,
        dataType: "json",
        success: function (response) {
            console.log(response);

            cityName.innerHTML = response.name + " (" + new Date().toLocaleDateString() + ")";
            currentIcon.setAttribute("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
            currentTemp.innerHTML = "Temp: " + response.main.temp + " &#176F";
            currentHumidity.innerHTML = "Humidity: " + response.main.humidity + "%";
            currentWind.innerHTML = "Wind Speed: " + response.wind.speed + " MPH";
            currentUv.innerHTML = "UV-Index: " + response.wind.speed + " ";
        }
    });

}
;

searchBtn.addEventListener("click", function () {
    var searchTerm = cityInput.value;
    CurrentWeather(searchTerm);
    searchHistory.push(searchTerm);
    localStorage.setItem("search", JSON.stringify(searchHistory));
    renderSearchHistory();
})

function k2f(K) {
    return Math.floor((K - 273.15) * 1.8 + 32);
}

function history() {
    history.innerHTML = "";
    for (let i = 0; i < history.length; i++) {
        var historyItem = document.createElement("input");
        historyItem.setAttribute("type", "text");
        historyItem.setAttribute("readonly", true);
        historyItem.setAttribute("class", "form-control d-block bg-white");
        historyItem.setAttribute("value", history[i]);
        historyItem.addEventListener("click", function () {
            getWeather(historyItem.value);
        })
        history.append(historyItem);
    }
}

function history() {
    if (history.length > 0) {
        getWeather(history[history.length - 1]);
    }
}
