const Gameboard = require("./board.js");

const Display = (player, computer) => {
  let playerDisplay = document.getElementById("player-display");
  let computerDisplay = document.getElementById("computer-display");
  let playerTurn = true;
  let computerMoves = [];
  let gameIsOver = false;

  const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const sinkShip = shipNumber => {
    let shipSections = document.getElementsByClassName(shipNumber);
    for (let i = 0; i < shipSections.length; i++) {
      shipSections[i].style["background"] = "rgb(17, 84, 0)";
    }
  };

  const playerSwap = () => {
    playerTurn = !playerTurn;
  };

  const gameOver = () => {
    let message = playerTurn == true ? "YOU WIN!" : "YOU LOSE!";
    document.getElementById("winner-display").textContent = message;
    gameIsOver = true;
  };

  const getRandomCoords = () => {
    let unique = false;
    while (unique == false) {
      let col = getRandomInt(8);
      let row = getRandomInt(8);
      coords = `${col},${row}`;
      unique = !computerMoves.includes(coords);
    }
    computerMoves.push(coords);
    return coords;
  };

  const computerMove = () => {
    if (!playerTurn) {
      let computerCoordinates = getRandomCoords();
      let shipStats = computer.receiveAttack(computerCoordinates);
      let row = computerCoordinates.split(",")[0];
      let column = computerCoordinates.split(",")[1];
      let col = document.querySelector(
        `[owner="computer"][row="${row}"][col="${column}"]`
      );
      checkAttack(shipStats, col, computer, "B");
      !playerTurn ? computerMove() : {};
    }
  };

  const checkAttack = (shipStats, col, game, id) => {
    if (shipStats[0]) {
      col.classList.add(id + shipStats[2]);
      col.style["background"] = "rgb(17, 244, 0)";
      if (shipStats[1]) {
        sinkShip(id + shipStats[2]);

        game.checkLost() ? gameOver() : {};
      }
      playerSwap();
    } else {
      col.style["background"] = "red";
    }
    playerSwap();
  };

  const generateRow = rowNum => {
    let row = document.createElement("div");
    row.classList.add("row");
    row.style.cssText = `height:40px;`;
    row.setAttribute("row", rowNum);
    return row;
  };

  const generateCol = (rowNum, colNum) => {
    let col = document.createElement("div");
    col.classList.add("col");
    col.setAttribute("row", rowNum);
    col.setAttribute("col", colNum);
    col.style.cssText = `height:40px;
                                    width:40px;
                                    background:rgba(3, 223, 252, 0.31);
                                    border:1px solid black;
                                    display:inline-block`;
    return col;
  };

  const generatePlayerBoard = () => {
    for (let rowNum = 0; rowNum < 8; rowNum++) {
      let row = generateRow(rowNum);
      for (let colNum = 0; colNum < 8; colNum++) {
        let col = generateCol(rowNum, colNum);
        col.addEventListener('mouseenter',function(e){
          this.style['background']='rgba(255, 0, 0, 0.336)'
        })
        col.addEventListener('mouseleave',function(e){
          this.style['background']='rgba(3, 223, 252, 0.31)'
        })
        
        


        col.addEventListener("click", function(e) {
          if ((playerTurn = true && !gameIsOver)) {
            let shipStats = player.receiveAttack(
              `${this.getAttribute("row")},${this.getAttribute("col")}`
            );
            checkAttack(shipStats, col, player, "A");
            let box = this;
            let boxClone = this.cloneNode(true);
            box.parentNode.replaceChild(boxClone,box)
            computerMove();      
          }
        
        });
        
        row.appendChild(col);
        playerDisplay.appendChild(row);
      }
    }
  };

  const generateComputeBoard = () => {
    for (let rowNum = 0; rowNum < 8; rowNum++) {
      let row = generateRow(rowNum);
      for (let colNum = 0; colNum < 8; colNum++) {
        let col = generateCol(rowNum, colNum);
        col.setAttribute("owner", "computer");
        col.setAttribute("boat","false")     
        row.appendChild(col);
      }
      computerDisplay.appendChild(row);
    }
  };

  generatePlayerBoard();
  generateComputeBoard();
};

module.exports = Display;