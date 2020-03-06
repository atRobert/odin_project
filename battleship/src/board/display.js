const Gameboard = require('./board.js')

const game=Gameboard()
console.log(game.placedShips)
console.log(game.bufferCoords)
let boardDisplay = document.getElementById('board-display')

const Display = () =>{
    for (let rowNum = 0; rowNum < 11; rowNum++ ){
        let row = document.createElement('div')
        row.classList.add('row')
        row.setAttribute('row',rowNum)
        for (let colNum = 0; colNum < 11; colNum++ ){
            let col = document.createElement('div')
            col.classList.add('row')
            col.setAttribute('row',rowNum)
            col.setAttribute('col',colNum)
            col.style.cssText = `height:50px;
                                    width:50px;
                                    border:1px solid black;
                                    display:inline-block`
            col.textContent = `${rowNum},${colNum}`
            col.addEventListener('mouseenter', function(e){
                if (game.receiveAttack(`${this.getAttribute('row')},${this.getAttribute('col')}`)[0]){
                    col.textContent='X'
                    col.style['background'] = 'green'
                } else{
                    col.textContent='Miss'
                    col.style['background'] = 'red'
                }
            })
            row.appendChild(col)
        boardDisplay.appendChild(row)
        }
    }
}

module.exports = Display