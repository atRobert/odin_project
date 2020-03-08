const Gameboard = require('./board.js')

const Display = (player, computer) =>{
    let playerDisplay = document.getElementById('player-display')
    let computerDisplay = document.getElementById('computer-display')
    let boardDisplay = document.getElementById('board-display')
    boardDisplay.style.textAlign ='center'
    playerDisplay.style['display'] = 'block'
    computerDisplay.style['display'] = 'block'
    let playerTurn = true
    let computerMoves = [] 

    const getRandomInt = max => {
        return Math.floor(Math.random() * Math.floor(max));
      };

    const sinkShip = (shipNumber) =>{
        let shipSections = document.getElementsByClassName(shipNumber)
        console.log(shipSections)
        for (let i=0; i < shipSections.length; i++){
            shipSections[i].style['background'] = 'rgb(17, 84, 0)';
        }
    }

    const playerSwap = () =>{
        playerTurn = !playerTurn
    }
    
    const gameOver = () => {
        let message = playerTurn == true ? 'YOU WIN!' : 'YOU LOSE!'
        document.getElementById('winner-display').textContent = message
    }

    const getRandomCoords = () => {
        let unique = false
        while (unique==false){
            let col = getRandomInt(8)
            let row = getRandomInt(8)
            coords = `${col},${row}`
            unique = !computerMoves.includes(coords)
        }
        computerMoves.push(coords)
        return coords
    }

    const computerMove = () => {
        if (!playerTurn){
            let computerCoordinates = getRandomCoords()
            console.log(computerCoordinates)
            let shipStats = computer.receiveAttack(computerCoordinates)
            let row = computerCoordinates.split(',')[0]
            let column = computerCoordinates.split(',')[1]
            let col = document.querySelector(`[owner="computer"][row="${row}"][col="${column}"]`)
            console.log(col)
            checkAttack(shipStats, col, computer, 'B')
            !playerTurn? computerMove() : {}
        }
    }

    const checkAttack = (shipStats, col, game, id) =>{
        if (shipStats[0]){
            col.classList.add(id+shipStats[2])
            col.style['background'] = 'rgb(17, 244, 0)';
            if (shipStats[1]){
                sinkShip(id+shipStats[2])
                game.checkLost() ? gameOver() : {}
            }
            playerSwap()
        } else{
            console.log('you miss!')
            col.style['background'] = 'red'
        }
        playerSwap()
    }

    for (let rowNum = 0; rowNum < 8; rowNum++ ){
        let row = document.createElement('div')
        row.classList.add('row')
        row.style.cssText = `height:40px;`
        row.setAttribute('row',rowNum)
        for (let colNum = 0; colNum < 8; colNum++ ){
            let col = document.createElement('div')
            col.classList.add('row')
            col.setAttribute('row',rowNum)
            col.setAttribute('col',colNum)
            col.style.cssText = `height:40px;
                                    width:40px;
                                    background:rgba(3, 223, 252, 0.31);
                                    border:1px solid black;
                                    display:inline-block`
            col.addEventListener('click', function(e){
                if (playerTurn){
                    let shipStats = player.receiveAttack(`${this.getAttribute('row')},${this.getAttribute('col')}`)
                    checkAttack(shipStats, col, player, 'A')
                    computerMove()
                }
            })
            row.appendChild(col)
        playerDisplay.appendChild(row)
        }
    }

    for (let rowNum = 0; rowNum < 8; rowNum++ ){
        let row = document.createElement('div')
        row.classList.add('row')
        row.style.cssText = `height:40px;`
        row.setAttribute('row',rowNum)
        for (let colNum = 0; colNum < 8; colNum++ ){
            let col = document.createElement('div')
            col.classList.add('row')
            col.setAttribute('row',rowNum)
            col.setAttribute('col',colNum)
            col.setAttribute('owner','computer')
            col.style.cssText = `height:40px;
                                    width:40px;
                                    background:rgba(3, 223, 252, 0.31);
                                    border:1px solid black;
                                    display:inline-block`

            row.appendChild(col)
        }
        computerDisplay.appendChild(row)
    }

    
}

module.exports = Display