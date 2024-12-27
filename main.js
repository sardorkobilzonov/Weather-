const cityEl =document.querySelector(".city")
const rainEl =document.querySelector(".rain-chance")
const temperatureEl =document.querySelector(".temperature")
const timeEl = document.querySelector(".time")
const imgEl =document.querySelector(".icon img")
const weeklyEl = document.querySelector(".weekly")
const hourlyEl = document.querySelector(".hourly")
const formEl = document.querySelector(".form")
const search_inpEl = document.querySelector(".search_inp")
const errorMessageEl = document.querySelector(".error__message")



const BASE_URL = ""

async function fetchWeather(city) {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=475420c2f9584ce6a74131315242412&q=${city}&days=7&aqi=yes&alerts=yes`)
    response 
        .json()
        .then(res => {
            console.log(res);
            cityEl.textContent = `${res.location.name}. ${res.location.country}`
            rainEl.textContent = res.current.condition.text
            temperatureEl.innerHTML = res.current.temp_c + "&deg"
            timeEl.textContent = res.location.localtime
            imgEl.src = res.current.condition.icon
            
            res.forecast.forecastday.forEach(item => {
                const forecastItem = document.createElement("div") 
                forecastItem.className = "day"
                forecastItem.innerHTML = `
                    
                    <p>${item.date}</p>
                    <div class="day-weather">
                        <img class="images-weather" src="${item.day.condition.icon}" alt="ob-havo rasmi">
                    </div>
                    <p>${item.day.avgtemp_c}&deg <sub>${item.day.mintemp_c}&deg</sub></p>
                `
                weeklyEl.appendChild(forecastItem)
            });
            
            
            const conditions = document.createElement("div");
            conditions.className = "hour";
            conditions.innerHTML = `
                <p class="info"> <i class="fa-solid fa-temperature-half" style="color: #d5d6d7;"></i> Real feel: ${res.current.feelslike_c}&deg;</p>
                <p class="info"> <i class="fa-solid fa-wind" style="color: #d5d6d7;"></i> Wind: ${res.current.wind_kph} km/h;</p>
                <p class="info"> <i class="fa-solid fa-sun" style="color: #d5d6d7;"></i> UV index: ${res.current.uv}</p>
                <p class="info"><i class="fa-solid fa-droplet" style="color: #d5d6d7;"></i> humidity: ${res.current.humidity}%</p>
            `;
            hourlyEl.appendChild(conditions);
        })
        .catch(err => {
            console.log(err);
            errorMessageEl.style.display = "block";
        
            setTimeout(() => {
                errorMessageEl.style.display = "none";
            }, 3000);
        });
        
}


window.onload = () => {
    fetchWeather('Tashkent')
}


formEl.addEventListener("submit", (e)=> {
    e.preventDefault()
    const city = search_inpEl
    console.log(city.value)
    fetchWeather(city.value)
    
    weeklyEl.innerHTML = ''
    hourlyEl.innerHTML = ''
    search_inpEl.value = ''
})