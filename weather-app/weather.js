const apiKey = 'fd44eb02e519e736eeb68874e1c597c9'


function formatTime(hours, minutes){
    let meridium = hours >= 12 ? ' PM' : ' AM'
    let twelveHour = hours % 12
    twelveHour == 0 ? twelveHour = 12 : {}
    let minutesFormatted
    if (minutes == 0){
        minutesFormatted = '00'
    } else if (minutes < 10){
        minutesFormatted = "0" + minutes.toString()
    } else {
        minutesFormatted = minutes.toString()
    }
    return (twelveHour.toString() + ':' + minutesFormatted + meridium)
}

function loadingCirlce(){
    const cityResults = document.getElementById('city-results')
    cityResults.innerHTML = `
        <div class="sk-chase">
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
        </div>
    `
}

function weatherData(){
    const cityResults = document.getElementById('city-results')
    cityResults.innerHTML = `
        <div id='weather-text'>&nbsp;</div>
        <div id='time-text'>&nbsp;</div>
        `
}

async function getCityWeather(cityName){
    loadingCirlce()
    try{
        const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&APPID=fd44eb02e519e736eeb68874e1c597c9`, {mode:'cors'})
        const data = await weather.json()
        const long = data.coord.lon
        const lat = data.coord.lat
        const time = await fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=BX35L7KUUB8G&format=json&by=position&lat=${lat}&lng=${long}`, {mode:"cors"})
        const timeData = await time.json();
        const timeFormatted = new Date(timeData.formatted) 
        const timeDisplay = formatTime(timeFormatted.getHours(),timeFormatted.getMinutes())
        weatherData()
        document.getElementById('weather-text').textContent = (`It's currently ${(data.main.temp).toString()}  \xB0F in ${cityName}`)
        document.getElementById('time-text').textContent = (timeDisplay)
    }
    catch{
        const cityResults = document.getElementById('city-results')
        cityResults.textContent = `Couldn't find resultes for ${cityName}`
    }

}


document.getElementById('search-city').addEventListener('click', function(e){
    event.preventDefault()
    const cityName = document.getElementById('city-name').value
    console.log(cityName)
    getCityWeather(cityName)
})



