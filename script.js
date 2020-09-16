// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast
//save to Json??
//create div
//prepend

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
    console.log(response);
    var cityHeading = $("#today-weather").text(
      response.name + " (" + moment.unix(response.dt).format("M/DD/YYYY") + ")"
    );
    var currentIcon = $("<img>");
    currentIcon.attr(
      "src",
      "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png"
    );
    var tempDiv = $("<p>").text("Temperature: " + response.main.temp + " °F");

    var humidityDiv = $("<p>").text(
      "Humidity: " + response.main.humidity + "%"
    );
    var windDiv = $("<p>").text("Wind Speed: " + response.wind.speed + " MPH");

    console.log(tempDiv);
    cityHeading.append(currentIcon);
    todayWeather.append(cityHeading);
    todayWeather.append(tempDiv);
    todayWeather.append(humidityDiv);
    todayWeather.append(windDiv);

    var lat = response.coord.lat;
    var lon = response.coord.lon;
    console.log(lat);
    
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
      console.log(response[0].value);
      var uv = response[0].value;
      var uvDiv = $("<button>");
        uvDiv.attr({
          class: "rounded"
        }).text(uv);

    if (uv < "3") {
        uvDiv.addClass("uv-div-green");
      }
    else if(uv > 3 && uv < 6){
        uvDiv.addClass("uv-div-yellow");
    }
    else if(uv >= 6 && uv < 8){
        uvDiv.addClass("uv-div-orange");
    }
    else if(uv >= 8 && uv < 11){
        uvDiv.addClass("uv-div-red");
    }    
    else if(uv >= 11){
        uvDiv.addClass("uv-div-purple");
    };
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
      console.log(results);
      $("#five-day-appear-here").empty();
      for (var i = 1; i < 6; i++) {
        var fiveDivMain = $("#five-day-master-main");
        var forecastHeading = $("#five-day-weather").text("5-Day Forecast");
        var fiveDiv = $("<div>").attr({ id: "five-div", class: "rounded" });
        var fiveDateM = moment.unix(results.daily[i].dt).format("M/DD/YYYY");
        var fiveDate = $("<h5>").text(fiveDateM);
        var fiveTemp = $("<p>").text(
          "Temp: " + results.daily[i].temp.max + " °F"
        );
        var fiveHumidity = $("<p>").text(
          "Humidity: " + results.daily[i].humidity + "%"
        );
        var fiveIcon = $("<img>");
        fiveIcon.attr(
          "src",
          "http://openweathermap.org/img/wn/" +
            results.daily[i].weather[0].icon +
            "@2x.png"
        );
        console.log(fiveDate);
        console.log(fiveTemp);
        console.log(fiveHumidity);
        console.log(results.daily[i].weather[0].icon);

        fiveDivMain.append(forecastHeading);
        fiveDiv.append(fiveDate);
        fiveDiv.append(fiveIcon);
        fiveDiv.append(fiveTemp);
        fiveDiv.append(fiveHumidity);

        $("#five-day-appear-here").append(fiveDiv);
      }
    });
   
  });

  
    event.preventDefault();
    localStorage.setItem(
      //key - newRow ID
      $(this).parent().attr("id"),
      //value - the textarea 
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
    console.log(savedInput);
    var newSearchButton = $("<button>").text(savedInput);
    newSearchButton.attr({id: "new-search-button"});
    $("#search-section").append(newSearchButton);
  }
