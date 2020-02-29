const apiKey = 'fd44eb02e519e736eeb68874e1c597c9'


function formatTime(timeFormatted){
    const dateTime = new Date(timeFormatted)
    const hours = dateTime.getHours()
    const minutes = dateTime.getMinutes()
    hoursFormatted = formatHours(hours)
    minutesFormatted = formatMinutes(minutes)
    let meridium = hours >= 12 ? ' PM' : ' AM'
    
    return (hoursFormatted + ':' + minutesFormatted + meridium)
}

function formatHours(hours){ 
    let twelveHour = hours % 12
    twelveHour == 0 ? twelveHour = 12 : {}
    return twelveHour.toString()
}

function formatMinutes(minutes){
    let minutesFormatted
    if (minutes == 0){
        minutesFormatted = '00'
    } else if (minutes < 10){
        minutesFormatted = "0" + minutes.toString()
    } else {
        minutesFormatted = minutes.toString()
    }
    return minutesFormatted
}


function loadingCirlce(){
    const cityResults = document.getElementById('city-results')
    const skChase = document.createElement('div')
    skChase.classList.add('sk-chase')
    for (let i = 0; i < 6; i++){
        let skChaseDot = document.createElement('div')
        skChaseDot.classList.add('sk-chase-dot')
        skChase.appendChild(skChaseDot)
    }
    cityResults.appendChild(skChase)
}

function removeLoadingCircle(){
    const cityResults = document.getElementById('city-results')
    cityResults.removeChild(cityResults.childNodes[cityResults.childNodes.length-1])
}


function clearWeatherData(){
    document.getElementById('weather-text').textContent = ' '
    document.getElementById('time-text').textContent = ' '
}

async function getCityWeather(cityName){
    const weatherText = document.getElementById('weather-text')
    clearWeatherData()
    loadingCirlce()
    try{
        const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&APPID=fd44eb02e519e736eeb68874e1c597c9`, {mode:'cors'})
        const data = await weather.json()
        const long = data.coord.lon
        const lat = data.coord.lat
        const time = await fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=BX35L7KUUB8G&format=json&by=position&lat=${lat}&lng=${long}`, {mode:"cors"})
        const timeData = await time.json();
        const timeDisplay = formatTime(timeData.formatted)
        removeLoadingCircle()
        weatherText.textContent = (`It's currently ${(data.main.temp).toString()}  \xB0F in ${cityName}`)
        document.getElementById('time-text').textContent = (timeDisplay)
    }
    catch{
        removeLoadingCircle()
        weatherText.textContent = `Couldn't find resultes for ${cityName}`
    }
}


document.getElementById('search-city').addEventListener('click', function(e){
    event.preventDefault()
    const cityName = document.getElementById('city-name').value
    getCityWeather(cityName)
})



