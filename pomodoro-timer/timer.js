
let minutesDisplay = document.querySelector('#minutes')
let secondsDisplay = document.querySelector('#seconds')
let status = document.querySelector('#status')
let minutes
let seconds
let startTime = 1500
let isPaused = true
let currentTimer = 'work'


setInterval(function(){
    isPaused ? {} : runClock();  
}, 1000)

function runClock(){
    startTime = --startTime
    minutesDisplay.textContent = getMinutes();
    secondsDisplay.textContent = getSeconds();
    checkSwap()
}

function checkSwap(){
    if (minutes == 0 && seconds == 0){
        if (currentTimer == 'work'){
            resetBreak()
            play()
        } else {
            resetTime()
            play()
        }
    }
}

function getSeconds(){
    seconds = startTime % 60;
    if (seconds == 0){
        seconds = '00'
    } else if (seconds < 10){
        seconds = "0" + seconds 
    }
    console.log(seconds)
    return seconds
}

function getMinutes(){
    minutes = startTime / 60;
    minutes < 1 ? minutes = '00' : minutes = Math.floor(startTime / 60)
    return minutes
}

function resetTime(){
    pause()
    status.textContent = 'Working Time!'
    currentTimer = 'work'
    startTime = 1500
    minutesDisplay.textContent = 25
    secondsDisplay.textContent = '00'
}

function resetBreak(){
    pause()
    status.textContent = 'Break Time!'
    currentTimer = 'break'
    startTime = 300
    minutesDisplay.textContent = 5
    secondsDisplay.textContent = '00'
}

function pause(){
    isPaused = true
}

function play(){
    isPaused = false
}

