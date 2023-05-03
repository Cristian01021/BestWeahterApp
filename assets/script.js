let searchBtn=document.querySelector('#searchBtn');
let cityInput=document.querySelector('#cityInput');
let weatherDiv=document.querySelector('#weather')
let currentDay=dayjs().format("ddd, MMM D")
let currentDayWeather=document.querySelector('#weatherData');
let daysLater=document.querySelectorAll(".daysLater")
let pastSearchesDiv=document.querySelector("#pastSearches")
let pastSearches=localStorage.getItem("searches")||[]
let weatherIcon=document.querySelectorAll('.weatherIcon')
let firstWeatherIcon=document.querySelector("#firstWeatherIcon");

function getCityWeather(event){
    
    event.preventDefault();
    let city=this.textContent
    if(city==="Search")
        city=cityInput.value
    getCoordinates(city);
    renderSearch(city);
  
}
function getCoordinates(city){
    let url="https://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=1&appid=30938dd6fcd531961e9f7d4e28342bde"
    let latitude, longitude;
    fetch(url)
    .then(function(response){
        if(!response.ok)
            console.log(response.status)
        else
            response.json().then(function (data){
                latitude=data[0].lat;
                longitude=data[0].lon;
                getWeather(latitude,longitude)
                
            })
            
    })

}
function getWeather(latitude, longitude){
    let url="https://api.openweathermap.org/data/2.5/forecast?lat="+latitude+"&lon="+longitude+"&appid=30938dd6fcd531961e9f7d4e28342bde&units=imperial"
    fetch(url)
    .then(function(response){
        if(!response.ok)
            console.log(response.status)
        else
            response.json().then(function(data){
                renderPage(data);
                console.log(data);

            })
    })

}
function renderPage(data){

    //main weather div
    currentDayWeather.children[0].textContent=data.city.name+","+ data.city.country;
    currentDayWeather.children[1].textContent= currentDay;
    currentDayWeather.children[3].children[0].textContent="temp: "+data.list[0].main.temp+"°F";
    currentDayWeather.children[3].children[1].textContent="wind: "+data.list[0].wind.speed+"mph";
    currentDayWeather.children[3].children[2].textContent="humidty: "+ data.list[0].main.humidity+"%";
    firstWeatherIcon.src="https://openweathermap.org/img/wn/"+data.list[0].weather[0].icon+"@2x.png"
    weatherDiv.setAttribute("class","col");
    
    let hourIndex=7
    for(let i=0;i<daysLater.length;i++){
        daysLater[i].parentElement.children[0].textContent=dayjs().add(i+1,"day").format('dddd')
        daysLater[i].parentElement.children[1].textContent=dayjs().add(i+1,"day").format('MMM, D')
        daysLater[i].children[0].textContent=data.list[hourIndex].main.temp+"°F";
        daysLater[i].children[1].textContent=data.list[hourIndex].wind.speed+"mph";
        daysLater[i].children[2].textContent=data.list[hourIndex].main.humidity+"%";
        weatherIcon[i].src="https://openweathermap.org/img/wn/"+data.list[hourIndex].weather[0].icon+"@2x.png"
        hourIndex+=8


    }
}
function renderSearch(city){
    pastSearchesDiv.innerHTML="";
    if (localStorage.getItem("searches")==null) {
        if(city){
            pastSearches.push(city)
        }
        localStorage.setItem("searches", JSON.stringify(pastSearches));
      } else {
        pastSearches = JSON.parse(localStorage.getItem("searches"));
        if(!pastSearches.includes(city)&& city){
            pastSearches.push(city);
            localStorage.setItem("searches", JSON.stringify(pastSearches));
        }
       
      }
      
    for(let i=0;i<pastSearches.length;i++){
        let newSearch=document.createElement("li")
        let newSearchClickable=document.createElement("button")
        newSearchClickable.innerHTML=pastSearches[i]
        newSearchClickable.addEventListener("click",getCityWeather)
        newSearch.append(newSearchClickable);
        pastSearchesDiv.appendChild(newSearch);
    }

}

searchBtn.addEventListener("click", getCityWeather);
renderSearch(null);
