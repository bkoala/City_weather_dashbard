# Weather Dashboard


The application uses the  [OpenWeather One Call API](https://openweathermap.org/api/one-call-api) API to retrieve weather data for cities. It stores informations of list of cities of past searches that the user can click to access information for that city.

## User Story
A user can use the tool to display information about the weather forecast for multiple cities to help him plan a trip accordingly

# How does the application work
The application presents the user with a search input form
When the user enter a city name, he is presented with weather
information forecast for that city. The city is also added to a 
menu of the search history.
The weather conditions for that city is presented on the page
and shows city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index.
The UV index color indicates whether the conditions are green for Uvi index less than 3, moderate or yellow for index between 3 and 6, and  severe for uv index greater than 6.
The future weather conditions for that city are presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity.
When the user clicks on a city in the search history
he is presented with current and future conditions for that city
