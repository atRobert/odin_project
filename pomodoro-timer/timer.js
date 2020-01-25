
let containers = document.getElementById('container')
let minutesDisplay = document.querySelector('#minutes')
let secondsDisplay = document.querySelector('#seconds')
let status = document.querySelector('#status')
let quoteBox = document.querySelector('#quote-box')
let minutes
let seconds
let startTime = 1500
let isPaused = true
let currentTimer = 'work'
let fiveSecondFlash = false
let currentFlash = 'red'

let quoteList = ["Your limitation it's only your imagination",
                    "Push yourself because no one else is going to do it.",
                    "Sometimes later becomes never. Do it now.",
                    "Great things never come from comfort zones.",
                    "Dream it. Wish it. Do it.",
                    "Success doesn't just find you. You have to go and get it.",
                    "The harder you work for something, the greater you'll feel when you achieve it.",
                    "Dream bigger. Do bigger.",
                    "Don't stop when you're tired. Stop when you're done."]


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

setInterval(function(){
    quoteBox.textContent = randomQuote()
}, 10000)

function randomQuote(){
    return quoteList[Math.floor(Math.random() * quoteList.length)];
}

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







