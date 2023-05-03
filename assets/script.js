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

