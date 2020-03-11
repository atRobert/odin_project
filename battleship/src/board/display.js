const Gameboard = require("./board.js");

const Display = (player, computer) => {
  let playerDisplay = document.getElementById("player-display");
  let computerDisplay = document.getElementById("computer-display");
  let playerTurn = true;
  let computerMoves = [];
  let playerShips = []
  let gameIsOver = false;

  const compilePlayerShips = () =>{
    for(let i=0; i<computer.placedShips.length;i++){
      playerShips.push(computer.placedShips[i].shipCoords)
    }
    playerShips = playerShips.flat()
  }
  
  const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const makeBow = (bowDiv, horizontal) =>{
    if (horizontal){
      bowDiv.style.cssText = `width: 0px;
                            height: 0px;
                            border-top: 21px solid rgba(17, 84, 0, 0);
                            border-bottom: 21px solid rgba(17, 84, 0, 0);
                            border-left: 42px solid rgb(17, 84, 0);
                            border-right-color: rgba(17, 84, 0, 0);
                            margin: 0px;
                            display: inline-block;`;
    } else {
      bowDiv.style.cssText = `width: 0px;
      height: 0px;
      border-left: 21px solid transparent;
      border-right: 21px solid transparent;
      border-top: 42px solid rgb(17, 84, 0);
      margin: 0px;
      display: inline-block;`;
    }
  }

  const sinkShip = (shipNumber,row,col, horizontal) => {
    let shipSections = document.getElementsByClassName(shipNumber);
    let length = 0 
    for (let i = 0; i < shipSections.length; i++) {
      length++
      shipSections[i].style["background"] = "rgb(17, 84, 0)";
      shipSections[i].style['border-color'] = 'rgb(17, 84, 0)'
      shipSections[i].innerHTML = ''
    }
    if (playerTurn && length > 1){
      let bow = document.querySelector(`[row="${row}"][col="${col}"][owner='player']`)
      console.log(bow)
      makeBow(bow, horizontal)
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
      col.firstChild.innerHTML = `
        <i 
        class="fas fa-fire-alt" 
        style="transform:translateY(70%) translateX(70%);
                color:red;"
        ></i>`
      col.classList.add(id + shipStats[2]);
      col.style["background"] = "rgb(10, 133, 161)";
      if (shipStats[1]) {
        let row = shipStats[3].split(',')[0]
        let col = shipStats[3].split(',')[1]
        sinkShip(id + shipStats[2],row,col,shipStats[5]);
        
        
        game.checkLost() ? gameOver() : {};
      }
      playerSwap();
    } else {
      col.style["background"] = "rgb(10, 133, 161)";
      col.firstChild.innerHTML = `
        <i 
        class="fas fa-circle" 
        style="transform:translateY(90%) translateX(110%);
              color:black;
              font-size:13px;"
        ></i>`
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
                                    background:rgb(10, 133, 161);
                                    border:1px solid black;
                                    display:inline-block`;
    let centeringCol = document.createElement('div')
    centeringCol.style.cssText = 'position:absolute'
    col.appendChild(centeringCol)
    return col;
  };

  const generatePlayerBoard = () => {
    for (let rowNum = 0; rowNum < 8; rowNum++) {
      let row = generateRow(rowNum);
      for (let colNum = 0; colNum < 8; colNum++) {
        let col = generateCol(rowNum, colNum);
        col.setAttribute('owner','player')
        col.addEventListener('mouseenter',function(e){
          this.firstChild.innerHTML = `<i 
          class="fas fa-crosshairs" 
          style="transform:translateY(30%) translateX(30%);
                  color:#FCA311;
                  font-size:25px;"
          ></i>`
        })
        col.addEventListener('mouseleave',function(e){
          this.firstChild.innerHTML = ''
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
        if (playerShips.includes(`${rowNum},${colNum}`)){
          col.style['background'] = 'grey'
        }
        col.setAttribute("owner", "computer");
        col.setAttribute("boat","false")     
        row.appendChild(col);
      }
      computerDisplay.appendChild(row);
    }
  };

  compilePlayerShips();
  console.log(playerShips)
  generatePlayerBoard();
  generateComputeBoard();
};

module.exports = Display;