var searchFormEl = document.querySelector('#search-form');
var apiKey="11ea42a7d531af4703b7f0546c96fa70";
var resultContentEl = document.querySelector('#result-content');
var resultContent2 = document.querySelector('#result-2ndcontent');


var searchCities=[];

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchcityVal = document.querySelector('#search-input').value;


  if (!searchcityVal) {
    alert('You need a search input value!');
    return;
  }else{
 // console.log(searchcityVal);
 searchCities.push(searchcityVal);
 searchApi(searchcityVal,apiKey);
  }
}



function searchApi(cityName,APIKey) {
  var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //console.log(data);
     // console.log(data.name);
     display_results(data);
      /*
      display_results(data);
      for (var i = 0; i < data.length; i++) {
        var listItem = document.createElement('li');
        listItem.textContent = data[i].html_url;
        repoList.appendChild(listItem);
      }
   */
    });
  }
// Runcode here
function display_results(resultObj){
  // Insert top of card here
  var result1Card = document.createElement('div');
  
  result1Card.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');
  var resultBody = document.createElement("div");
  resultBody.classList.add('card-body');
  var imgN=document.createElement("img");
   imgN.setAttribute("src", "cloug.jpg");
  var titleEl = document.createElement('h3');
  titleEl.append(imgN);
  titleEl.textContent = resultObj.name + "( DATE " + ")" ;
  var temP = document.createElement('p');
    temP.innerHTML =
    '<strong>Temp:</strong> ' + resultObj.main.temp + '<br/>';
  var wind = document.createElement('p');
    wind.innerHTML =
      '<strong>Wind:</strong> ' + resultObj.wind.speed + '<br/>'
       + '<strong>Humidity:</strong> ' + resultObj.main.humidity + '<br/>' 
       +'<strong>UV Index:</strong> ' + resultObj.wind.speed + '<br/>';

  resultBody.append(titleEl,temP,wind);
  result1Card.append(resultBody);

//Append second section of Result in another card
 var result2Card =document.createElement('div');
     

  resultContentEl.append(result1Card);
}


searchFormEl.addEventListener('submit', handleSearchFormSubmit);

//
/*
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