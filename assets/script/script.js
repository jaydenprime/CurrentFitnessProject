
var currentAQ = document.getElementById("current-aq")
var aqListEl = document.getElementById("aq-li")
var category = document.getElementById("current-cat")
var number = document.getElementById("current-num")
var searchBtn = document.getElementById("search-btn")
var searchInput = document.getElementById("search-input")
// not needed
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

        var riseSetUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${storedLat}&lon=${storedLon}&units=imperial&appid=${api.openWeaKey}`;
        fetch(riseSetUrl)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                
                var sunRise = JSON.stringify(data.current.sunrise)
                var sunSet = JSON.stringify(data.current.sunset)
                var riseUTC = 'Sunrise:' + '  ' + new Date(sunRise * 1000)
                var setUTC = 'Sunset:' + '  ' + new Date(sunSet * 1000)
        
                document.getElementById("sunrise").innerHTML = riseUTC
                document.getElementById("sunset").innerHTML = setUTC
        
                console.log(data)
            })
            .catch(error => {
              console.log(error)
            })


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
              // aqListEl.textContent = ""
              currentAQ.innerText = data[0].AQI;
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
              category.textContent = data[0].Category.Name
              // gives AQ a categry number
              console.log(data[0].Category.Number)
              number.textContent = data[0].Category.Number
        
            });
        }

        getWeatherApi();

        // weather and forecast function
        function getWeatherApi() {
          var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${storedLat}&lon=${storedLon}&units=imperial&appid=${api.openWeaKey}`;
        
          fetch(requestUrl)
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              console.log(data)
              //Current
              let cHour1 = moment().add(1, "hourly").format("hh:" + "mma");
              let hour1 = data.hourly[1].feels_like;
              let clouds1 = data.hourly[1].clouds;
              let maxTemp1 = data.daily[1].temp.max;
              let minTemp1 = data.daily[1].temp.min;
              let day1hum = data.daily[1].humidity;
              let day1wind = data.daily[1].wind_speed;
              $("#cHour1").text("Current Time: " + cHour1);
              $("#hour1").text("Feels like " + hour1);
              $("#clouds1").text(clouds1 + "% Cloud Coverage");
              $("#maxTemp1").text("High Today of: " + maxTemp1 + " F°");
              $("#minTemp1").text("Low Today of: " + minTemp1 + " F°");
              $("#wind1").text("Wind Speed: " + day1wind + " mph");
              $("#hum1").text("Humidity:" + " " + day1hum + "%");

              //Hour 2
              let cHour2 = moment().add(2, "hourly").format("hh:" + "mma");
              let hour2 = data.hourly[2].feels_like;
              let clouds2 = data.hourly[2].clouds;
              let maxTemp2 = data.daily[2].temp.max;
              let minTemp2 = data.daily[2].temp.min;
              let day2hum = data.daily[2].humidity;
              let day2wind = data.daily[2].wind_speed;
              $("#cHour2").text("Around " + cHour2 + " Tomorrow");
              $("#hour2").text("It Will Feels like " + hour2);
              $("#clouds2").text(clouds2 + "% Cloud Coverage");
              $("#maxTemp2").text("Daily High of: " + maxTemp2 + " F°");
              $("#minTemp2").text("Daily Low of: " + minTemp2 + " F°");
              $("#wind2").text("Wind Speed: " + day2wind + " mph");
              $("#hum2").text("Humidity:" + " " + day2hum + "%");

              //hour 3
              let cHour3 = moment().add(3, "hourly").format("hh:" + "mma");
              let hour3 = data.hourly[3].feels_like;
              let clouds3 = data.hourly[3].clouds;
              let maxTemp3 = data.daily[3].temp.max;
              let minTemp3 = data.daily[3].temp.min;
              let day3hum = data.daily[3].humidity;
              let day3wind = data.daily[3].wind_speed;
              $("#cHour3").text("Around " + cHour3 + " in 2 Days");
              $("#hour3").text("It Will Feels like " + hour3);
              $("#clouds3").text(clouds3 + "% Cloud Coverage");
              $("#maxTemp3").text("Daily High of: " + maxTemp3 + " F°");
              $("#minTemp3").text("Daily Low of: " + minTemp3 + " F°");
              $("#wind3").text("Wind Speed: " + day3wind + " mph");
              $("#hum3").text("Humidity:" + " " + day3hum + "%");

              //hour 4
              let cHour4 = moment().add(4, "hourly").format("hh:" + "mma");
              let hour4 = data.hourly[4].feels_like;
              let clouds4 = data.hourly[4].clouds;
              let maxTemp4 = data.daily[4].temp.max;
              let minTemp4 = data.daily[4].temp.min;
              let day4hum = data.daily[4].humidity;
              let day4wind = data.daily[4].wind_speed;
              $("#cHour4").text("Around " + cHour4 + " in 3 Days");
              $("#hour4").text("It Will Feels like " + hour4);
              $("#clouds4").text(clouds4 + "% Cloud Coverage");
              $("#maxTemp4").text("Daily High of: " + maxTemp4 + " F°");
              $("#minTemp4").text("Daily Low of: " + minTemp4 + " F°");
              $("#wind4").text("Wind Speed: " + day4wind + " mph");
              $("#hum4").text("Humidity:" + " " + day4hum + "%");

              //hour 5
              let cHour5 = moment().add(5, "hourly").format("hh:" + "mma");
              let hour5 = data.hourly[5].feels_like;
              let clouds5 = data.hourly[5].clouds;
              let maxTemp5 = data.daily[5].temp.max;
              let minTemp5 = data.daily[5].temp.min;
              let day5hum = data.daily[5].humidity;
              let day5wind = data.daily[5].wind_speed;
              $("#cHour5").text("Around " + cHour5 + " in 4 Days");
              $("#hour5").text("It Will Feels like " + hour5);
              $("#clouds5").text(clouds5 + "% Cloud Coverage");
              $("#maxTemp5").text("Daily High of: " + maxTemp5 + " F°");
              $("#minTemp5").text("Daily Low of: " + minTemp5 + " F°");
              $("#wind5").text("Wind Speed: " + day5wind + " mph");
              $("#hum5").text("Humidity:" + " " + day5hum + "%");

              //hour 6
              let cHour6 = moment().add(6, "hourly").format("hh:" + "mma");
              let hour6 = data.hourly[6].feels_like;
              let clouds6 = data.hourly[6].clouds;
              let maxTemp6 = data.daily[6].temp.max;
              let minTemp6 = data.daily[6].temp.min;
              let day6hum = data.daily[6].humidity;
              let day6wind = data.daily[6].wind_speed;
              $("#cHour6").text("Around " + cHour6 + " in 5 Days");
              $("#hour6").text("It Will Feels like " + hour6);
              $("#clouds6").text(clouds6 + "% Cloud Coverage");
              $("#maxTemp6").text("Daily High of: " + maxTemp6 + " F°");
              $("#minTemp6").text("Daily Low of: " + minTemp6 + " F°");
              $("#wind6").text("Wind Speed: " + day6wind + " mph");
              $("#hum6").text("Humidity:" + " " + day6hum + "%");

              //hour 7
              let cHour7 = moment().add(7, "hourly").format("hh:" + "mma");
              let hour7 = data.hourly[7].feels_like;
              let clouds7 = data.hourly[7].clouds;
              let maxTemp7 = data.daily[7].temp.max;
              let minTemp7 = data.daily[7].temp.min;
              let day7hum = data.daily[7].humidity;
              let day7wind = data.daily[7].wind_speed;
              $("#cHour7").text("Around " + cHour7 + " in 6 Days");
              $("#hour7").text("It Will Feels like " + hour7);
              $("#clouds7").text(clouds7 + "% Cloud Coverage");
              $("#maxTemp7").text("Daily High of: " + maxTemp7 + " F°");
              $("#minTemp7").text("Daily Low of: " + minTemp7 + " F°");
              $("#wind7").text("Wind Speed: " + day7wind + " mph");
              $("#hum7").text("Humidity:" + " " + day7hum + "%");
            });
      }
        //leaflet map API
        var  OSM_URL  =  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';  
        var  OSM_ATTRIB  =  '&copy;  <a  href="http://openstreetmap.org/copyright">OpenStreetMap</a>  contributors';  
        var  osmLayer  =  L.tileLayer(OSM_URL,  {attribution:  OSM_ATTRIB});  

        var  WAQI_URL    =  "https://tiles.waqi.info/tiles/usepa-aqi/{z}/{x}/{y}.png?token=_TOKEN_ID_";  
        var  WAQI_ATTR  =  'Air  Quality  Tiles  &copy;  <a  href="http://waqi.info">waqi.info</a>';  
        var  waqiLayer  =  L.tileLayer(WAQI_URL,  {attribution:  WAQI_ATTR});  
        var  map  =  L.map('map').setView([storedLat,  storedLon],  9);  
        map.addLayer(osmLayer).addLayer(waqiLayer);  

          })
          
}
})
