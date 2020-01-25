
let containers = document.getElementById('container')
let minutesDisplay = document.querySelector('#minutes')
let secondsDisplay = document.querySelector('#seconds')
let status = document.querySelector('#status')
let minutes
let seconds
let startTime = 1500
let isPaused = true
let currentTimer = 'work'
let fiveSecondFlash = false
let currentFlash = 'red'


setInterval(function(){
    isPaused ? {} : runClock();  
}, 1000)

setInterval(function(){
    if (fiveSecondFlash){
        if (currentFlash == 'red'){
            containers.style.borderColor='#131862'
            currentFlash = 'normal'
        } else {
            containers.style.borderColor='red'
            currentFlash = 'red'
        }
    }
}, 300)

function runClock(){
    startTime = --startTime
    minutesDisplay.textContent = getMinutes();
    secondsDisplay.textContent = getSeconds();
    checkSwap();
    startTime <= 5? fiveSecondFlash = true : noFlash();
}

function noFlash(){
    fiveSecondFlash = false
    containers.style.borderColor='#131862'
    currentFlash = 'normal'
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
    currentTimer == 'work' ? resetWork() : resetBreak()
}

function resetWork(){
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







