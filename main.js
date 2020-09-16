function getWeatherApi() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Brasov,Ro&appid=c7da641777760054e5ca6164eb47580a')
    .then(res => res.json())
    .then(weather => displayWeather(weather));
}

const weatherDOM = document.querySelector('[data-container]');

function displayWeather(weather) {
    
    weatherDOM.innerHTML = `
    <img src="icons/${weather.weather[0].icon}.png">
    <strong>Today's weather in ${weather.name}, ${weather.sys.country}</strong>
    <h4 class="text-danger pt-2">${document.cookie === 'temp=Celsius' || localStorage.temp === 'Celsius' ? kToC(weather.main.temp) : kToF(weather.main.temp)}</h4>
    <p class="text-secondary">Humidity: ${weather.main.humidity}%</p>
    <p class="text-secondary">Pressure: ${weather.main.pressure} mbar</p>
    <p class="text-secondary">Wind: ${weather.wind.speed} km/h</p>
    <p class="text-secondary">Feels like: ${document.cookie === 'temp=Celsius' || localStorage.temp === 'Celsius' ? kToC(weather.main.feels_like) : kToF(weather.main.feels_like)}</p>
    `
}

function kToC(kelvin) {
    return `${parseInt((kelvin - 273.15))}° C`;
}

function kToF(kelvin) {
    return `${parseInt(((kelvin - 273.15) * 9/5 + 32))}° F`;
}


//======================Cookies=========================

// const tempRadios = document.querySelectorAll('[data-temp]');
// const selectedTemp = getCookiesAsObj().temp;

// (function init() {
//     if(!document.cookie) {
//         weatherDOM.innerHTML = '';
//     } else {
//         getWeatherApi();
//     }
// })();

// function getCookiesAsObj() {
//     const cookies = document.cookie.split('; ')
    
//     const cookieObj = cookies.reduce((acc, cookie) => { 
//         const [name, value] = cookie.split('=')
//         acc[name] = value;
        
//         return acc;
//     }, {});
//     return cookieObj;
// }

// tempRadios.forEach((input) => {
//     if (selectedTemp === input.value) {
//         input.checked = true;
//     }

//     input.addEventListener('change', () => {
//         document.cookie = `temp=${input.value}`;
//         getWeatherApi();
//     })
// });

//=======================Local Storage========================

const tempRadios = document.querySelectorAll('[data-temp]');
const selectedTemp = localStorage.getItem('temp');

(function init() {
    if(!localStorage.hasOwnProperty('temp')) {
        weatherDOM.innerHTML = '';
    } else {
        getWeatherApi();
    }
})();

tempRadios.forEach((input) => {
    if (selectedTemp === input.value) {
        input.checked = true;
    }

    input.addEventListener('change', () => {
        localStorage.setItem('temp', input.value);
        getWeatherApi();
    })
});
