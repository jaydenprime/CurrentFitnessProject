
var pollenData = document.getElementById("pollen-data")
var grassIndex = document.getElementById("grass-index")
function getApi() {
    var requestUrl = `https://api.purpleair.com/v1/sensors?fields=humidity,temperature&api_key=${api.purpAirKey}`;
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
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
testApi();