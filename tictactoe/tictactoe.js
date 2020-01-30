function TttGame(p1Name, p2Name, size=3){
    this.board = generateBoard(size)
    this.diagWinCondition = generateDiagWinCondition(size)
    this.playerOne = new Player(p1Name, 'x')
    this.playerTwo = new Player(p2Name, 'o')
    this.currentPlayer = this.playerTwo
}

function Player(name, marker){
    this.name = name
    this.marker = marker
    this.columnMoves = []
    this.rowMoves = []
    this.genMoves = []
}


function generateDiagWinCondition(size){
    let leftToRight = []
    let rightToLeft = []
    let top = size - 1
    for (let i = 0; i < size; i++){
        rightToLeft.push(String([i, top]))
        leftToRight.push(String([i, i]))
        top--
    }
    return [leftToRight, rightToLeft]
}


function generateBoard(size){
    size = Number(size)
    let theBoard = new Array(size)
    for (let i = 0; i < size; i++) {
        theBoard[i] = new Array(size);
    }
    return theBoard
}



function playerChoice(game, row, col){
    let validMove = checkMoveIsValid(game.board, row, col)
    if (validMove){
        board = placeMark(game, row, col)
        game.currentPlayer.rowMoves.push(row)
        game.currentPlayer.columnMoves.push(col)
        game.currentPlayer.genMoves.push(String([row,col]))
        return board
    } else {
        newChoice = alert('Spot Taken Try again!')
        turnCount--
    }
}

function checkMoveIsValid(board, row, col){
    let result 
    console.log(row)
    console.log(col)
    board[row][col] === undefined ? result = true : result = false
    return result
}

function placeMark(game, row, col){
    game.board[row][col] = game.currentPlayer.marker
    return game.board
}

function checkWin(currentPlayer, boardSize, diagWinCondition){
    let colWin = rowColWin(currentPlayer.columnMoves, boardSize)
    let rolWin = rowColWin(currentPlayer.rowMoves, boardSize)
    let diagWin = diaganolWin(diagWinCondition, currentPlayer.genMoves)
    return colWin || rolWin || diagWin
}

function diaganolWin(diagWinCondition, genMoves){
    let result = false
    console.log(diagWinCondition)
    console.log(genMoves)
    checker = (arr, target) => target.every(v => arr.includes(v));
    checker(genMoves, diagWinCondition[0]) ? result = true : {}
    checker(genMoves, diagWinCondition[1]) ? result = true : {}
    return result
}


function rowColWin(rowCol, boardSize){
    let result = false
    moveCount = rowCol.reduce(function(obj, item){
        if (!obj[item]){
            obj[item]=0
        }
        obj[item]++;
        obj[item] == boardSize ? result = true : {}
        return obj;
    },{})
    return result
}

function buildBoard(boardSize){
    let gameBoard = document.getElementById('gameBoard')
    let paddingSize = Math.floor(400 / boardSize) + 'px'
    let boxCount = 1
    for (let colNum = 0; colNum < boardSize; colNum++){
        let column = document.createElement('div')
        column.classList.add('col')
        column.style.cssText = `height:${paddingSize};width:${paddingSize};line-height:${paddingSize};`
        gameBoard.appendChild(column)
        for (let rowNum=0; rowNum < boardSize; rowNum++ ){
            let row = document.createElement('div')
            row.classList.add('row')
            row.classList.add('_' + rowNum + '_' + colNum )
            row.classList.add('box'+boxCount)
            row.style.cssText = `height:${paddingSize};width:${paddingSize};line-height:${paddingSize};font-size:${paddingSize};`

            boxCount == 1 ? row.style.borderTopLeftRadius = '12px' : {}
            boxCount == boardSize ? row.style.borderBottomLeftRadius = '12px' : {}
            boxCount == boardSize**2 ? row.style.borderBottomRightRadius = '12px' : {}
            boxCount == boardSize**2 - boardSize + 1 ? row.style.borderTopRightRadius = '12px' : {}
            boxCount++

            row.addEventListener('click',function(){
                console.log(this)
                let rowCol = this.classList[1]
                rowCol = rowCol.split('_')
                rowCol.shift()
                playGame(game,rowCol[0],rowCol[1], this)

            })
            column.appendChild(row)
        }
    }   
}


function playGame(game, row, col, e){
    let display = document.getElementById('display')
    if (turnCount > boardSize**2){
        display.textContent = "It's a tie!"
    } else if (!gameWon){
  
        
        game.currentPlayer == game.playerOne ? game.currentPlayer = game.playerTwo : game.currentPlayer = game.playerOne
        playerChoice(game, row, col)      
        gameWon = checkWin(game.currentPlayer, boardSize, game.diagWinCondition)
        e.textContent = game.currentPlayer.marker
        turnCount++
        turnCount > boardSize**2 ? display.textContent = "It's a tie!" : {}
        if (gameWon){         
            display.textContent = game.currentPlayer.name + ' wins!'
        }
    } else{
       alert('GAME OVER') 
    }
}

function promptBoardSize(){
    let boardSize
    while (isNaN(boardSize)){
        boardSize = prompt('How big do you want the board?',3)
    }
    return boardSize
}


let playerNameSubmit = document.getElementById("playerNameSubmit")
playerNameSubmit.addEventListener('click',function(event){
    event.preventDefault()
    let playerInfo = document.getElementById("playerInfo")
    const playerOne = document.getElementById("playerOneName").value || "Player One (X)"
    const playerTwo = document.getElementById("playerTwoName").value || "Player Two (O)"
    boardSize = document.getElementById("getBoardSize").value
    // document.getElementById('gameBoard').removeChild(playerInfo)
    playerInfo.style.display = 'none'
    turnCount = 1
    game = new TttGame(playerOne,playerTwo,boardSize)
    gameWon = false
    buildBoard(boardSize)
})

let resetGame = document.getElementById("resetButton")
resetGame.addEventListener('click',function(even){
    event.preventDefault()
    let gameBoardShadow = document.getElementById("gameBoardShadow")
    let gameBoard = document.getElementById("gameBoard")
    let playerInfo = document.getElementById("playerInfo")
    let display = document.getElementById("display")
    display.textContent = "TIC TAC TOE"
    gameBoardShadow.removeChild(gameBoard)
    gameBoard = document.createElement('div')
    gameBoard.setAttribute('id','gameBoard')
    gameBoardShadow.appendChild(gameBoard)
    game = null
    playerInfo.style.display = ''
})





