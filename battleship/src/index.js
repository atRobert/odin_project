const Gameboard = require('./board/board.js')
const Display = require('./board/display.js')
// const test=Gameboard()

let playButton = document.getElementById('play')
playButton.addEventListener('click', function(e){
    this.style.visibility='hidden'
    this.style.opacity='0'
    document.getElementById('door-right').style.width = '0'
    document.getElementById('door-left').style.width = '0'
})

let resetButton = document.getElementById('reset')
resetButton.addEventListener('click', function(e){

    document.getElementById('door-right').style.width = '50vw'
    document.getElementById('door-left').style.width = '50vw'
    setTimeout(function(){
        playButton.style.visibility='visible'
        playButton.style.opacity='1'
        },1200)
    
})

const player=Gameboard()
const computer=Gameboard()
Display(player,computer)
