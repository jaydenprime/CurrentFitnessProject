
function getApi() {
    var requestUrl = `https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=today`;
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
      });
}
// getApi();