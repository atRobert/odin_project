function TttGame(p1Name, p2Name, size=3){
    this.board = generateBoard(size)
    this.playerOne = new Player(p1Name, 'x')
    this.playerTwo = new Player(p2Name, 'o')
    this.currentPlayer = this.playerOne
}

function Player(name, marker){
    this.name = name
    this.marker = marker
    this.columnMoves = []
    this.rowMoves = []
}

function generateBoard(size){
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
    board[row][col] === undefined ? result = true : result = false
    return result
}

function placeMark(game, row, col){
    game.board[row][col] = game.currentPlayer.marker
    return game.board
}

function checkWin(currentPlayer, boardSize){
    let colWin = rowColWin(currentPlayer.columnMoves, boardSize)
    let rolWin = rowColWin(currentPlayer.rowMoves, boardSize)
    // diaganolWin(game.board, game.currentPlayer.marker)
    return colWin || rolWin
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
const game = new TttGame('rob','mike',3)