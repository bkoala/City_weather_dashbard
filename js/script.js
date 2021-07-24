var searchFormEl = document.querySelector('#search-form');
var apiKey="11ea42a7d531af4703b7f0546c96fa70";
var resultContentEl = document.querySelector('#result-content');
//var resultContent2 = document.querySelector('#result-2ndcontent');
var searchCities=JSON.parse(localStorage.getItem("searchCities"));
   
function handleSearchFormSubmit(event) {
  event.preventDefault();
  var searchcityVal = document.querySelector('#search-input').value;

  if (!searchcityVal) {
    alert('You need a search input value!');
    return;
  }else{
 // search city information   
   searchApi(searchcityVal,apiKey);
  }
}


function searchApi(cityName,APIKey) {

//Find long and lat first

 var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;

 fetch(requestUrl)
   .then(function (response) {
     return response.json();
   })
   .then(function (data) {
      //console.log(data);
       //Put long and lat in results 
      $laT= data.coord.lat;
      $lonG = data.coord.lon;
   
    //  console.log($laT + " 12323 ");

   // FIND data for forecast
   var requestUrl="https://api.openweathermap.org/data/2.5/onecall?lat=" + $laT +"&lon=" + $lonG + "&exclude=current,hourly,minutely,alerts" + "&appid=" + APIKey;
    fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //Display the information
      display_results(data,cityName);

    })
  });;
  }
// Runcode here
function display_results(resultObj,citY){
  // Insert top of card here
  var resultCard = document.createElement('div');
  var dateToday=moment().format('L');
  
  resultCard.classList.add('card');
  var resultBody = document.createElement("div");
    resultBody.classList.add('card-body');

    var titleEl = document.createElement('h1');
     titleEl.classList.add('capitalize-first');
     titleEl.setAttribute('style','font-size:40px')
     titleEl.textContent = citY + " (" + dateToday +  ") " ;
    var temP = document.createElement('p');
    temP.setAttribute('style','font-size:30px;padding-top:15px')
    temP.innerHTML =
    '<strong>Temp: ' + resultObj.daily[0].temp.day +'</strong><br/> '
     + '<strong>Wind: ' + resultObj.daily[0].wind_speed + '</strong> <br/>'
       + '<strong>Humidity: ' + resultObj.daily[0].humidity + '</strong><br/>' 
       +'<strong>UV Index: <span> ' + resultObj.daily[0].uvi + '</span></strong><br/>';

  resultBody.append(titleEl,temP);
   var title2=document.createElement('p');
   title2.setAttribute('style','font-size:40px;padding-top:1.625rem')
     title2.innerHTML="5-Day Forecast:";
  var roW2=document.createElement('div');
      roW2.classList.add('row');
 

      for (var ii = 1; ii < 6; ii++) {
         var iconCode = resultObj.daily[ii].weather[0].icon;
         var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
          var colI=document.createElement('div');
           
              colI.classList.add('col-auto');
              colI.setAttribute('id','card'+ii);
              colI.setAttribute('style','background-color:black;color:white;margin:5px;')
         var texP = document.createElement('p');
             texP.setAttribute('style','font-size:26px;padding-bottom:10px')
          texP.innerHTML =
           '<strong>' +  moment().add(ii,'d').format('L') + '</strong><br/>' 
           + '<img src=' + iconUrl  + '><br/>'
         +'<strong>Temp: ' + resultObj.daily[ii].temp.day +'</strong><br/> '
         +'<strong>Wind: </strong> ' + resultObj.daily[ii].wind_speed + '<br/>'
          + '<strong>Humidity: </strong> ' + resultObj.daily[ii].humidity + '<br/>' ;
          colI.append(texP);
       roW2.append(colI);
      }
     var card2=document.createElement("div")
         card2.classList.add('card');
      var resultBody2 = document.createElement("div");
          resultBody2.classList.add('card-body');
          resultBody2.append(roW2);
          card2.append(resultBody2);
          resultCard.append(resultBody);
          //Append to content
          add_citytoList(citY);   
          
   resultContentEl.append(resultCard,title2,card2); 

}
function add_citytoList(name){
   var searchCities=JSON.parse(localStorage.getItem("searchCities"));
   if ( searchCities !== null){
      for (xx=0; xx<searchCities.length ; xx++){
        if (name === searchCities[ii]){
           return;
        }
      }
     searchCities.push(name);
   }
   localStorage.setItem("searchCities",JSON.stringify(searchCities));
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

//5days
1627080602


/*api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
weather: Array(1)
0: {id: 800, main: "Clear", description: "clear sky", icon: "01d"}
   var iconCode = data.weather[0].icon;
and then use that to construct a url which points to the icon,

var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
and then write that to your html using jQuery (or vanilla JavaScript).

$(".icon").html("<img src='" + iconUrl  + "'>");
Or to put it all together.

$(".icon").html("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon +                        

{
   "cod":"200",
   "message":0.0032,
   "cnt":36,
   "list":[
      {
         "dt":1487246400,
         "main":{
            "temp":286.67,
            "temp_min":281.556,
            "temp_max":286.67,
            "pressure":972.73,
            "sea_level":1046.46,
            "grnd_level":972.73,
            "humidity":75,
            "temp_kf":5.11
         },
         "weather":[
            {
               "id":800,
               "main":"Clear",
               "description":"clear sky",
               "icon":"01d"
            }
         ],
         "clouds":{
            "all":0
         },
         "wind":{
            "speed":1.81,
            "deg":247.501,
            "gust": 7.87
         },
         "sys":{
            "pod":"d"
         },
         "dt_txt":"2017-02-16 12:00:00"
      },
      {
         "dt":1487257200,
         "main":{
            "temp":285.66,
            "temp_min":281.821,
            "temp_max":285.66,
            "pressure":970.91,
            "sea_level":1044.32,
            "grnd_level":970.91,
            "humidity":70,
            "temp_kf":3.84
         },
         "weather":[
            {
               "id":800,
               "main":"Clear",
               "description":"clear sky",
               "icon":"01d"
            }
         ],
         "clouds":{
            "all":0
         },
         "wind":{
            "speed":1.59,
            "deg":290.501,
            "gust": 7.87
         },
         "sys":{
            "pod":"d"
         },
         "dt_txt":"2017-02-16 15:00:00"
      },
      {
         "dt":1487268000,
         "main":{
            "temp":277.05,
            "temp_min":274.498,
            "temp_max":277.05,
            "pressure":970.44,
            "sea_level":1044.7,
            "grnd_level":970.44,
            "humidity":90,
            "temp_kf":2.56
         },
         "weather":[
            {
               "id":800,
               "main":"Clear",
               "description":"clear sky",
               "icon":"01n"
            }
         ],
         "clouds":{
            "all":0
         },
         "wind":{
            "speed":1.41,
            "deg":263.5,
            "gust": 7.87
         },
         "sys":{
            "pod":"n"
         },
         "dt_txt":"2017-02-16 18:00:00"
      },
      ....
      {
         "dt":1487624400,
         "main":{
            "temp":272.424,
            "temp_min":272.424,
            "temp_max":272.424,
            "pressure":968.38,
            "sea_level":1043.17,
            "grnd_level":968.38,
            "humidity":85,
            "temp_kf":0
         },
         "weather":[
            {
               "id":801,
               "main":"Clouds",
               "description":"few clouds",
               "icon":"02n"
            }
         ],
         "clouds":{
            "all":20
         },
         "wind":{
            "speed":3.57,
            "deg":255.503,
            "gust": 7.87
         },
         "rain":{

         },
         "snow":{

         },
         "sys":{
            "pod":"n"
         },
         "dt_txt":"2017-02-20 21:00:00"
      }
   ],
   "city":{
      "id":6940463,
      "name":"Altstadt",
      "coord":{
         "lat":48.137,
         "lon":11.5752
      },
      "country":"none"
   }
}
                          

                        
---------------------------------------------------------
base: "stations" /...base 
clouds: {all: 40}
cod: 200
coord:
lat: 47.6062
lon: -122.3321
__proto__: Object
dt: 1626928611
id: 5809844
main:
feels_like: 288.79
humidity: 67
pressure: 1019
temp: 289.36
temp_max: 291.77
temp_min: 286.86
__proto__: Object
name: "Seattle"
sys:
country: "US"
id: 2037795
sunrise: 1626870829
sunset: 1626926239
type: 2
__proto__: Object
timezone: -25200
visibility: 10000
weather: Array(1)
0: {id: 802, main: "Clouds", description: "scattered clouds", icon: "03n"}
length: 1
__proto__: Array(0)
wind: {speed: 0.45, deg: 312, gust: 0.89}
__proto__: Object
﻿
mai
mai
*/