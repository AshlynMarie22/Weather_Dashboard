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

$("button").on("click", function() {
    var cityName = $("#city-name").val().trim(); 
    var weatherURL1 = 
    "https://api.openweathermap.org/data/2.5/weather?q=" + 
    cityName + 
    "&appid=8ceacd89b8e1c989e122d777944eb5b2";
    

    $.ajax({
      url: weatherURL1,
      method: "GET"
    })
      .then(function(response) {
        var results = response.main;
        console.log(response);
        var cityName = $("#city-name").val().trim(); 
    
    var weatherURL2 = 
    "https://api.openweathermap.org/data/2.5/forecast?q=" + 
    cityName + 
    "&appid=8ceacd89b8e1c989e122d777944eb5b2";
    

    $.ajax({
      url: weatherURL2,
      method: "GET"
    })
      .then(function(response) {
        var results = response.main;
        console.log(response);

        // for (var i = 0; i < results.length; i++) {
        //   var weatherDiv = $("<div>");

        //   var rating = results[i].rating;

        //   var p = $("<p>").text("Rating: " + rating);

        //   var personImage = $("<img>");
        //   personImage.attr("src", results[i].images.fixed_height.url);

        //   weatherDiv.prepend(p);
        //   weatherDiv.prepend(personImage);

        //   $("#weather-appear-here").prepend(weatherDiv);
        // }
      });
    });
});