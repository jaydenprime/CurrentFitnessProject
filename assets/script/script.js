
var currentAQ = document.getElementById("current-aq")
var category = document.getElementById("current-cat")
var number = document.getElementById("current-num")
var searchBtn = document.getElementById("search-btn")
var searchInput = document.getElementById("search-input")

searchBtn.addEventListener("click", function() {
  var cityInput = searchInput.value;
  var cityUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&appid=${api.openWeaKey}`;

  console.log(cityInput)

  getGeoCodeApi();

  function getGeoCodeApi() {
    var requestUrl = cityUrl;
    fetch(requestUrl)
        .then(function (response) {
        return response.json();
    })
        .then(function (data) {
          console.log(data)
        var cityLat = data[0].lat
        var storedLat = cityLat.toFixed(2)
        localStorage.setItem("lattitude", storedLat)
        var cityLon = data[0].lon  
        var storedLon = cityLon.toFixed(2)
        localStorage.setItem("longtitude", storedLon)

        console.log(storedLat)
        
        console.log(storedLon)
          })

}
})

function getApi() {
    var requestUrl = `https://api.purpleair.com/v1/sensors?fields=humidity,temperature&api_key=${api.purpAirKey}`;
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log(data)
        // console.log(data.data[0])
        // treeIndex.textContent = "hi"

      });
}
getApi();
function testApi() {
    var requestUrl = `https://api.tomorrow.io/v4/timelines?location=33.8583,-118.0648&fields=treeIndex,grassIndex&apikey=${api.tomKey}`;
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        console.log(data.data.timelines[0].intervals[0].values.grassIndex)
        grassIndex.textContent = `grass index: ${data.data.timelines[0].intervals[0].values.grassIndex}`
        // console.log(data.data[0])
        // treeIndex.textContent = "hi"

      });
}
// testApi();
function airNowApi() {
  var requestUrl = `https://www.airnowapi.org/aq/forecast/latLong/?format=application/json&latitude=39.0509&longitude=-121.4453&date=2022-08-16&distance=25&API_KEY=${api.airNowKey}`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json(); 
    })
    .then(function (data) {
      console.log(data)
      //gives air quality
      console.log(data[0].AQI)
      currentAQ.textContent = 'Current Air Quality: ' + data[0].AQI;
      //gives AQ a category name
      console.log(data[0].Category.Name)
      category.textContent = 'Quality: ' + data[0].Category.Name
      // gives AQ a categry number
      console.log(data[0].Category.Number)
      number.textContent = 'Category: ' + data[0].Category.Number

    });
}
airNowApi();

function showWeather() {
  var cityInput = input.val();
  if (!cityInput) {
      alert("Please Enter a Valid City Name")
      return;
  }
  cityEl.text(cityInput);
  var cityUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&appid=${api.key}`;
  searchedCities.push(cityInput);
  localStorage.setItem("city", searchedCities);
  var lastCity = searchedCities[searchedCities.length - 1];
  var searchEl = $('<li>');
  searchEl.attr("class", "list-group-item list-group-item-dark li-custom")
  searchEl.text(lastCity)
  searchHistory.append(searchEl);

}



