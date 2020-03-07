const Gameboard = require('./board.js')

const game=Gameboard()
console.log(game.placedShips)
console.log(game.bufferCoords)
let boardDisplay = document.getElementById('board-display')

const Display = () =>{
    const sinkShip = (shipNumber) =>{
        let shipSections = document.getElementsByClassName(shipNumber)
        console.log(shipSections)
        for (let i=0; i < shipSections.length; i++){
            shipSections[i].style['background'] = 'rgb(17, 84, 0)';
        }
    }
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
            col.addEventListener('mouseenter', function(e){
                let shipStats = game.receiveAttack(`${this.getAttribute('row')},${this.getAttribute('col')}`)
                if (shipStats[0]){
                    col.classList.add('_'+shipStats[2])
                    col.style['background'] = 'rgb(17, 244, 0)';
                    (shipStats[1]) ? sinkShip('_'+shipStats[3]) : {};
                } else{
                    col.style['background'] = 'red'
                }
            })
            row.appendChild(col)
        boardDisplay.appendChild(row)
        }
    }
}

module.exports = Display