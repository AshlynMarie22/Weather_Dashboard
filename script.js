$("button").on("click", function () {
  var cityName = $(".city-name").val().trim();

  //Current Forecast:
  var weatherURL1 =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=imperial&appid=8ceacd89b8e1c989e122d777944eb5b2";
  var todayWeather = $("#weather-appear-here");
  todayWeather.attr({
    id: "weather-appear-here-box",
  });

  $.ajax({
    url: weatherURL1,
    method: "GET",
  }).then(function (response) {
    //Header:
    var cityHeading = $("#today-weather").text(
      response.name + " (" + moment.unix(response.dt).format("M/DD/YYYY") + ")"
    );
    //Weather Icon:
    var currentIcon = $("<img>");
    currentIcon.attr(
      "src",
      "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png"
    );
    //Temperature:
    var tempDiv = $("<p>").text("Temperature: " + response.main.temp + " °F");
    //Humidity
    var humidityDiv = $("<p>").text(
      "Humidity: " + response.main.humidity + "%"
    );
    //Wind:
    var windDiv = $("<p>").text("Wind Speed: " + response.wind.speed + " MPH");

    //Join (aka append) everything:
    cityHeading.append(currentIcon);
    todayWeather.append(cityHeading);
    todayWeather.append(tempDiv);
    todayWeather.append(humidityDiv);
    todayWeather.append(windDiv);
    
    //lattitude and longitude for the UV forecast:
    var lat = response.coord.lat;
    var lon = response.coord.lon;

    //UV Forecast:
    var uvURL =
      "https://api.openweathermap.org/data/2.5/uvi/forecast?appid=8ceacd89b8e1c989e122d777944eb5b2&lat=" +
      lat +
      "&lon=" +
      lon;

    $.ajax({
      url: uvURL,
      method: "GET",
    }).then(function (response) {
      
      var uv = response[0].value;
      var uvDiv = $("<button>");
      uvDiv
        .attr({
          class: "rounded",
        })
        .text(uv);
    //How to determine which color the uv box should be: 
      if (uv < "3") {
        uvDiv.addClass("uv-div-green");
      } else if (uv > 3 && uv < 6) {
        uvDiv.addClass("uv-div-yellow");
      } else if (uv >= 6 && uv < 8) {
        uvDiv.addClass("uv-div-orange");
      } else if (uv >= 8 && uv < 11) {
        uvDiv.addClass("uv-div-red");
      } else if (uv >= 11) {
        uvDiv.addClass("uv-div-purple");
      }
      //Append it together: 
      var uvText = $("<div>").text("UV Index: ");
      uvText.append(uvDiv);
      todayWeather.append(uvText);
    });

    //5-Day Forecast:
    var weatherURL2 =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&exclude=current,minutely,hourly&units=imperial&appid=8ceacd89b8e1c989e122d777944eb5b2&";

    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityName +
      "&units=imperial&appid=8ceacd89b8e1c989e122d777944eb5b2";

    $.ajax({
      url: weatherURL2,
      method: "GET",
    }).then(function (response) {
      var results = response;
      $("#five-day-appear-here").empty();
      for (var i = 1; i < 6; i++) {
        //Header:
        var fiveDivMain = $("#five-day-master-main");
        var forecastHeading = $("#five-day-weather").text("5-Day Forecast");
        //Div for each day:
        var fiveDiv = $("<div>").attr({ id: "five-div", class: "rounded" });
        //Converting Date using moment.js:
        var fiveDateM = moment.unix(results.daily[i].dt).format("M/DD/YYYY");
        var fiveDate = $("<h5>").text(fiveDateM);
        //Temp:
        var fiveTemp = $("<p>").text(
          "Temp: " + results.daily[i].temp.max + " °F"
        );
        //Humidity:
        var fiveHumidity = $("<p>").text(
          "Humidity: " + results.daily[i].humidity + "%"
        );
        //Weather Icon:
        var fiveIcon = $("<img>");
        fiveIcon.attr(
          "src",
          "http://openweathermap.org/img/wn/" +
            results.daily[i].weather[0].icon +
            "@2x.png"
        );
        //Append everything together:
        fiveDivMain.append(forecastHeading);
        fiveDiv.append(fiveDate);
        fiveDiv.append(fiveIcon);
        fiveDiv.append(fiveTemp);
        fiveDiv.append(fiveHumidity);

        $("#five-day-appear-here").append(fiveDiv);
      }
    });
  });
//Setting to storage:
  event.preventDefault();
  localStorage.setItem(
    $(this).parent().attr("id"),
    $(this).siblings(".city-name").val().trim()
  );
  getStorage();
});
function getStorage() {
  var storageItems = Object.keys(localStorage);
  for (var i = 0; i < storageItems.length; i++) {
    var savedInput = localStorage.getItem(storageItems[i]);
    $("#" + storageItems[i].toString())
      .children(".city-name")
      .val(savedInput);
  }
  //Creating the save Buttons:
  console.log(savedInput);
  var newSearchButton = $("<button>").text(savedInput);
  newSearchButton.attr({ id: "new-search-button" });
  $("#search-section").append(newSearchButton);
  $(newSearchButton).on("click", function () {
    $(".city-name").val(savedInput);
  });
}
