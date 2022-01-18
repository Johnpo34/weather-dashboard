// current - https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=0a140ffac63fb307b321a0a3034253b3&units=imperial

// 5day - https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid=0a140ffac63fb307b321a0a3034253b3&units=imperial

var searchBtn = document.querySelector('.search-btn');
var fiveDayContainer = document.querySelector('.five-day-container')

searchBtn.addEventListener('click', function() {
    var city = document.querySelector('.input-container').value
    getCurrentWeather(city)
})

function getCurrentWeather(value) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+ value + '&appid=0a140ffac63fb307b321a0a3034253b3&units=imperial')
    .then(res => res.json())
    .then(data => {
        console.log(data);

        var lat = data.coord.lat
        var lon = data.coord.lon
        getFiveDay(lat, lon)

        document.querySelector('.city-name').textContent = data.name

        document.querySelector('.temp').textContent = data.main.temp

        document.querySelector('.humidity').textContent = data.main.humidity

        document.querySelector('.wind').textContent = data.wind.speed

    })
}

function getFiveDay(lat, lon) {
    fiveDayContainer.textContent = ''
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+ lat + '&lon='+ lon +'&appid=0a140ffac63fb307b321a0a3034253b3&units=imperial')
    .then(res => res.json())
    .then(data => {
        console.log(data);

        document.querySelector('.uvi').textContent = data.current.uvi

        for(var i = 0; i < 5; i++) {
            var card = document.createElement('div')
            fiveDayContainer.append(card)

            var day = document.createElement('h2')
            day.setAttribute('class', 'day')
            day.textContent = moment().add(i + 1, 'days').format('dddd')
            card.append(day)

            var fiveDayTemp = document.createElement('p')
            fiveDayTemp.textContent = 'Temp: ' + data.daily[i].temp.day + ' F'
            card.append(fiveDayTemp)

            var fiveDayHum = document.createElement('p')
            fiveDayHum.textContent = 'Humidity:' + data.daily[i].humidity
            card.append(fiveDayHum)

            var fiveDayWind = document.createElement('p')
            fiveDayWind.textContent = 'Wind:' + data.daily[i].wind_speed
            card.append(fiveDayWind)
        }
    })
}