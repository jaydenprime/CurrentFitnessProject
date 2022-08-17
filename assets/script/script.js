
var currentAQ = document.getElementById("current-aq")
var category = document.getElementById("current-cat")
var number = document.getElementById("current-num")
var searchBtn = document.getElementById("search-btn")
var searchInput = document.getElementById("search-input")

var storedLat = localStorage.getItem("latitude")
var storedLon = localStorage.getItem("longtitude")



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

        airNowApi();

        function airNowApi() {
          var requestUrl = `https://www.airnowapi.org/aq/forecast/latLong/?format=application/json&latitude=${storedLat}&longitude=${storedLon}&date=2022-08-16&distance=25&API_KEY=${api.airNowKey}`;
        
          fetch(requestUrl)
            .then(function (response) {
              return response.json(); 
            })
            .then(function (data) {
              console.log(data)
              //gives air quality
              console.log(data[0].AQI)
              currentAQ.textContent = 'Current Air Quality: ' + data[0].AQI;
              if (data[0].AQI <51) {
                currentAQ.setAttribute("class", "green")
              }
              if (data[0].AQI <100 && data[0].AQI >=51) {
                currentAQ.setAttribute("class", "yellow")
              }
              if (data[0].AQI <150 && data[0].AQI >=101) {
                currentAQ.setAttribute("class", "orange")
              }
              if (data[0].AQI <200 && data[0].AQI >=151) {
                currentAQ.setAttribute("class", "red")
              }
              if (data[0].AQI <300 && data[0].AQI >=201) {
                currentAQ.setAttribute("class", "purple")
              }
              if (data[0].AQI <500 && data[0].AQI >=301) {
                currentAQ.setAttribute("class", "maroon")
              }
              //gives AQ a category name
              console.log(data[0].Category.Name)
              category.textContent = 'Quality: ' + data[0].Category.Name
              // gives AQ a categry number
              console.log(data[0].Category.Number)
              number.textContent = 'Category: ' + data[0].Category.Number
        
            });
        }

          })
          
}
})

