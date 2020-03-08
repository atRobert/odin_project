const Gameboard = require('./board/board.js')
const Display = require('./board/display.js')
// const test=Gameboard()
let player
let computer
let playButton = document.getElementById('play')
playButton.addEventListener('click', function(e){
    document.getElementById('text').style.visibility='hidden'
    this.style.visibility='hidden'
    this.style.opacity='0'
    player=Gameboard()
    computer=Gameboard()
    Display(player,computer)
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


