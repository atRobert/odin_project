
let display = document.querySelector('#display')
let currentTotal = 1
let num = document.querySelector('.num')
let currentSolution = ''
let listen = true
let storedNumber = ''
let previousCompute = ''
let computeQueue = false


function getNumber(number){
    if (listen == true) {
        display.textContent += number
    } else {
        display.textContent = ''
        listen = true
        display.textContent = number
    }
}

function clearDisplay(){
    display.textContent = ''
    currentSolution = ''
    listen = true
    storedNumber = ''
    previousCompute = ''
    computeQueue = false
    
}

function compute(operation){
    if (computeQueue == false){
        listen = false
        storedNumber = display.textContent
        previousCompute = operation
        computeQueue = true
    } else {
        listen = false
        let passNumber = parseFloat(storedNumber)
        let passDisplay = parseFloat(display.textContent)
        if (previousCompute == "add"){
            storedNumber = add(passNumber, passDisplay)
        } else if (previousCompute == "subtract"){
            storedNumber = subtract(passNumber, passDisplay)
        } else if (previousCompute == "multiply"){
            storedNumber = multiply(passNumber, passDisplay)
        } else if (previousCompute == "divide"){
            storedNumber = divide(passNumber, passDisplay)
        }
        previousCompute = operation
    }
    
}


function signSwap(){
    if (display.textContent == '' || listen == false){
        display.textContent = '-'
        listen = true
    } else {
        display.textContent = parseFloat(display.textContent) * -1
    }
}

function toPercent(){
    display.textContent = parseFloat(display.textContent) * .01
}

function toDecimal(){
    display.textContent.includes('.') ? {} : display.textContent += '.' 
}

function updateDisplay(number){
    display.textContent = number
    currentSolution = number
}


function divide(storedNumber, displayNumber){
    updateDisplay(storedNumber /  displayNumber)
    return storedNumber / displayNumber
}

function multiply(storedNumber, displayNumber){
    updateDisplay(storedNumber *  displayNumber)
    return storedNumber * displayNumber
}

function subtract(storedNumber, displayNumber){
    updateDisplay(storedNumber - displayNumber)
    return storedNumber - displayNumber
}

function add(storedNumber, displayNumber){
    updateDisplay(storedNumber + displayNumber)
    return storedNumber + displayNumber
}

function equals(){
    let passNumber = parseFloat(storedNumber)
    let passDisplay = parseFloat(display.textContent)
    if (previousCompute == "add"){
        storedNumber = add(passNumber, passDisplay)
    } else if (previousCompute == "subtract"){
        storedNumber = subtract(passNumber, passDisplay)
    } else if (previousCompute == "multiply"){
        storedNumber = multiply(passNumber, passDisplay)
    } else if (previousCompute == "divide"){
        storedNumber = divide(passNumber, passDisplay)
    }
    currentSolution == '' ? {} : display.textContent = currentSolution
    computeQueue = false
    previousCompute = ''
}
