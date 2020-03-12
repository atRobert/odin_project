const Gameboard = require('./board/board.js')
const Display = require('./board/display.js')
const playerSelectionBoard = require('./board/playerSelectionBoard.js')

let player
let computer
let resetButton = document.getElementById('reset')
let playButton = document.getElementById('play')
let playerCoords 
let shipSizes = [4,3,2,2,1,1,1]

function openDoors(){
    document.getElementById('door-right').style.width = '0'
    document.getElementById('door-left').style.width = '0' 
}

function closeDoors(){
    document.getElementById('door-right').style.width = '50vw'
    document.getElementById('door-left').style.width = '50vw'
}

function hidePlayButton(){
    document.getElementById('text').style.visibility='hidden'
    playButton.style.visibility='hidden'
    playButton.style.opacity='0'
}

function showPlayButton(){
    document.getElementById('text').style.visibility='visible'
    playButton.style.visibility='visible'
    playButton.style.opacity='1'
}

function clearGameBoard(){
    document.getElementById('player-display').innerHTML = ''
    document.getElementById('computer-display').innerHTML = ''
    document.getElementById('winner-display').textContent =''
}

function hidePlayerSelectionBoard(){
    document.getElementById('set-ship-board').innerHTML = ''
    document.getElementById('set-ship-display').style['display'] = 'none'
    document.getElementById('board-display').style['display'] = 'block'
}

function buildGameBoard(){
    closeDoors()
    setTimeout(function(){
        hidePlayerSelectionBoard()
        openDoors()
        document.getElementById('text').style.visibility='hidden'
        let computerBoard=Gameboard(shipSizes,playerCoords.getShipPoints())
        let playerBoard=Gameboard(shipSizes)
        Display(playerBoard,computerBoard)
    },1000)
}


playButton.addEventListener('click', function(e){  
    playerCoords = playerSelectionBoard(shipSizes)
    document.getElementById('ready').addEventListener('click',buildGameBoard)
    hidePlayButton()
    document.getElementById('board-display').style['display'] = 'none'
    openDoors()
})


resetButton.addEventListener('click', function(e){
    clearGameBoard()
    closeDoors()
    setTimeout(function(){
        showPlayButton()
        document.getElementById('set-ship-display').style['display'] = 'block' 
        },1200) 
})


