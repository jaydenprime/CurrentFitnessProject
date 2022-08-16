
// var pollenData = document.getElementById("pollen-data")
var currentAQ = document.getElementById("current-aq")
var category = document.getElementById("current-cat")
var number = document.getElementById("current-num")
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
