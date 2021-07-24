var searchFormEl = document.querySelector('#search-form');
var searchContents = document.querySelector('#search-cities');
var apiKey="11ea42a7d531af4703b7f0546c96fa70";


   
//Update the information about searched cities
//handle_Cities();

function search_Weather (event){
   console.log(event.target.id);
   var myId=event.target.id;
   var cityN = document.getElementById(myId).innerHTML.trim() ;
   searchApi(cityN,apiKey);
}
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
function handle_Cities(){
  // console.log('started');
   document.getElementById('search-cities').innerHTML = "";
   var searchCities=JSON.parse(localStorage.getItem("searchCities"));
   if ( searchCities !== null){
      for (xx=0; xx<searchCities.length ; xx++){
        var butSearch=document.createElement('p');
            butSearch.classList.add('btn','btn-block','btn-primary');
            butSearch.setAttribute('type','button');
            butSearch.setAttribute('id','btn-'+xx);
            butSearch.innerHTML=searchCities[xx];
            butSearch.setAttribute('style','margin-bottom:20px');
       searchContents.append(butSearch);
       var btnEl =document.getElementById("btn-"+xx);
       btnEl.addEventListener('click',search_Weather);
      }
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
     // console.log(data);
      //Display the information
      display_results(data,cityName);

    })
  });;
  }
// Runcode here
function display_results(resultObj,citY){
  // Insert top of card here
  //Clear previous content
  document.getElementById('result-content').innerHTML = "";
  var resultContentEl = document.querySelector('#result-content');
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
   handle_Cities();
}
function add_citytoList(name){
      
       var searchCities=JSON.parse(localStorage.getItem("searchCities"));
   if ( searchCities !== null){
      for (xx=0; xx<searchCities.length ; xx++){
        if (name.toUpperCase() === searchCities[xx].toUpperCase()){  
           return;
        }
      }
      searchCities.push(name);
      localStorage.setItem("searchCities",JSON.stringify(searchCities));
   }else{
      var searchCities=[];
      searchCities.push(name);
      localStorage.setItem("searchCities",JSON.stringify(searchCities));
   }  
   return;
}
handle_Cities();
searchFormEl.addEventListener('submit', handleSearchFormSubmit);
