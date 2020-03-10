const Gameboard = require('./board/board.js')
const Display = require('./board/display.js')
const playerboard = require('./board/playerboard.js')

let player
let computer
let playButton = document.getElementById('play')
let playerCoords = playerboard()
function buildEverything(){
    document.getElementById('set-ship-board').innerHTML = ''
    document.getElementById('set-ship-display').style['display'] = 'none'
    document.getElementById('board-display').style['display'] = 'block'
    console.log(playerCoords.getShipPoints())
    document.getElementById('text').style.visibility='hidden'
    computerBoard=Gameboard(playerCoords.getShipPoints())
    playerBoard=Gameboard()
    Display(playerBoard,computerBoard)
    document.getElementById('door-right').style.width = '0'
    document.getElementById('door-left').style.width = '0'
}


playButton.addEventListener('click', function(e){  
    document.getElementById('ships-placed').addEventListener('click',buildEverything)
    document.getElementById('text').style.visibility='hidden'
    this.style.visibility='hidden'
    this.style.opacity='0'
    document.getElementById('board-display').style['display'] = 'none'
    document.getElementById('door-right').style.width = '0'
    document.getElementById('door-left').style.width = '0'
})

let resetButton = document.getElementById('reset')
resetButton.addEventListener('click', function(e){
    document.getElementById('text').style.visibility='visible'
    document.getElementById('door-right').style.width = '50vw'
    document.getElementById('door-left').style.width = '50vw'
    
    setTimeout(function(){
        Display(player,computer)
        playButton.style.visibility='visible'
        playButton.style.opacity='1'
        document.getElementById('player-display').innerHTML = ''
        document.getElementById('computer-display').innerHTML = ''
        document.getElementById('winner-display').textContent =''
        player=Gameboard()
        computer=Gameboard()
        },1200)
    
})


