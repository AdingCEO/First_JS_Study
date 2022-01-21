const API_KEY = '6548f44520033940bf068818621d8687'

function onGeoOk(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log('You live in', lat, lon);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
        const weather = document.querySelector('#weather span:first-child');
        const city = document.querySelector('#weather span:last-child');
        city.innerText = data.name;
        weather.innerText = `${data.weather[0].description} / ${data.main.temp}`;
        });
}
function onGeoError(){
    alert('날씨 정보를 찾을 수 없습니다');
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);