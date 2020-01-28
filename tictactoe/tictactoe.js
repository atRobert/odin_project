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
        newChoice = prompt('Spot Taken Try again (row) (col)').split(' ')
        board = playerChoice(game, newChoice[0], newChoice[1])
        game.currentPlayer.rowMoves.push(row)
        game.currentPlayer.columnMoves.push(col)
        return board
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
    result = false
    moveCount = rowCol.reduce(function(obj, item){
        if (!obj[item]){
            obj[item]=0
        }
        obj[item]++;
        return obj;

    },{})
    for (let key in moveCount){
        let value = moveCount[key];
        if (value >= boardSize){
          result = true
        }
    }
    return result
}

function buildBoard(boardSize){
    let gameBoard = document.getElementById('gameBoard')
    for (let colNum = 0; colNum < boardSize; colNum++){
        let column = document.createElement('div')
        column.classList.add('col')
        gameBoard.appendChild(column)
        for (let rowNum=0; rowNum < boardSize; rowNum++ ){
            let row = document.createElement('div')
            row.classList.add('row')
            row.classList.add('_' + rowNum + '_' + colNum )
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
    if (!gameWon){
        game.currentPlayer == game.playerOne ? game.currentPlayer = game.playerTwo : game.currentPlayer = game.playerOne
        playerChoice(game, row, col)
        gameWon = checkWin(game.currentPlayer, boardSize, game.diagWinCondition)
        console.table(game.board)
        e.textContent = game.currentPlayer.marker
        if (gameWon){
            let display = document.getElementById('display')
            display.textContent = game.currentPlayer.name + ' wins!'
            console.log(game.currentPlayer.name + ' wins!')
            console.table(game.board)
        }

    } else{
       console.log('game is over. Sorry') 
    }
}


const playerOne = prompt('Player 1, enter your name.')
const playerTwo = prompt('Player 2, enter your name.')
const boardSize = prompt('How big do you want the board?',3)
const game = new TttGame(playerOne,playerTwo,boardSize)
let gameWon = false
buildBoard(boardSize)



