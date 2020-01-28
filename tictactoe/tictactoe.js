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


const playerOne = prompt('Player 1, enter your name.')
const playerTwo = prompt('Player 2, enter your name.')
const boardSize = prompt('How big do you want the board?',3)
const game = new TttGame(playerOne,playerTwo,boardSize)
let gameWon = false
while (!gameWon){
    game.currentPlayer == game.playerOne ? game.currentPlayer = game.playerTwo : game.currentPlayer = game.playerOne
    console.table(game.board)
    let currentPlayerMove = prompt(game.currentPlayer.name + ' choose your row and col.(Space Between)')
    let row = currentPlayerMove.split(' ')[0]
    let col = currentPlayerMove.split(' ')[1]
    playerChoice(game, row, col)
    gameWon = checkWin(game.currentPlayer, boardSize, game.diagWinCondition)

}
console.log(game.currentPlayer.name + ' wins!')
console.table(game.board)
