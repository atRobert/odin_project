const apiKey = 'fd44eb02e519e736eeb68874e1c597c9'


function formatTime(hours, minutes){
    let meridium = hours >= 12 ? ' PM' : ' AM'
    twelveHour = hours % 12
    let minutesFormatted = minutes == 0 ? '00' : minutes.toString()
    return (twelveHour.toString() + ':' + minutesFormatted + meridium)
}


async function getCityWeather(cityName){
    let long 
    let lat
    const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&APPID=fd44eb02e519e736eeb68874e1c597c9`)
    const data = await weather.json()
    
    long = data.coord.lon
    lat = data.coord.lat
    const time = await fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=BX35L7KUUB8G&format=json&by=position&lat=${lat}&lng=${long}`)
    const timeData = await time.json();
    const timeFormatted = new Date(timeData.formatted) 
    const timeDisplay = formatTime(timeFormatted.getHours(),timeFormatted.getMinutes())
    document.getElementById('weather-text').textContent = (`It's currently ${(data.main.temp).toString()}  \xB0F in ${cityName}`)
    document.getElementById('time-text').textContent = (timeDisplay)
}


document.getElementById('search-city').addEventListener('click', function(e){
    event.preventDefault()
    const cityName = document.getElementById('city-name').value
    console.log(cityName)
    getCityWeather(cityName)
})



