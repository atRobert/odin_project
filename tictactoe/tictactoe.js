function TttGame(p1Name, p2Name, size=3){
    this.board = generateBoard(size)
    this.playerOne = new Player(p1Name, 'x')
    this.playerTwo = new Player(p2Name, 'o')
    this.currentPlayer = this.playerOne
}

function Player(name, marker){
    this.name = name
    this.marker = marker
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
        return board
    } else {
        newChoice = prompt('Spot Taken Try again (row) (col)').split(' ')
        board = playerChoice(game, newChoice[0], newChoice[1])
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

function checkWin(game){
    verticalWin(game.board, game.currentPlayer.marker)
    horizontalWin(game.board, game.currentPlayer.marker)
    diaganolWin(game.board, game.currentPlayer.marker)
}

function horizontalWin(board, mark){
    function checkHorizontal(row){
        let allEqual = row.every( move => move === mark)
        let anyUndefined = row.some( move => move != undefined)
        return allEqual && anyUndefined == true ? true : false
    }

    let result = false
    for (let row = 0; row < board.length; row++){
        checkHorizontal(board[row]) ? result = true : {}
    }
    return result
}

function verticalWin(board, mark){
    let result = false 
    for (let col = 0; col < board.length; col++){
        let vertical = board.map(element => element[col])
        let anyUndefined = vertical.some( move => move != undefined)
        vertical = vertical.every(mark => mark === mark)
        
        vertical && anyUndefined == true ? result = true : {}
    }
    return result
}

const game = new TttGame('rob','mike',3)