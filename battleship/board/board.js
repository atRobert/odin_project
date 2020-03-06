const Gameboard = () => {
    let board = [
      ["empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty"]
    ];
    let placedShips = [];
    let placedShipCoords = []
    let shipSizes = [3, 2, 2, 1];
  
    const getRandomInt = max => {
      return Math.floor(Math.random() * Math.floor(max));
    };

    const getShipIndex = (row,col) => {
        let shipIndex 
        for (let i = 0; i < placedShipCoords.length ; i++){
            placedShipCoords[i].includes(`${row},${col}`) ? shipIndex = i : {}
        }
        return shipIndex
    }
  
    
    const generateShipCoordinates = shipLength => {
      let shipOrigin = [
        getRandomInt(6 - shipLength),
        getRandomInt(6 - shipLength)
      ];
  
      let shipCoords = [shipOrigin];
      let i = shipOrigin[0];
      while (shipCoords.length < shipLength) {
        let lastSection = shipCoords.slice(0, 1);
        lastSection = [++i, lastSection[0][1]];
        shipCoords.unshift(lastSection);
      }
      return shipCoords;
    };

    const getShipSection = (shipIndex, row, col) =>{
        let ship = JSON.parse(placedShipCoords[shipIndex])
        let shipSection = ship.findIndex(element => element == [row, col])

    }

    const receiveAttack = (row,col) =>{
        if (board[row][col] != 'empty' ){
            let shipInfo = board[row][col].split('.')
            placedShips[shipInfo[0]].hit(shipInfo[1])
            console.log(shipInfo)
            board[row][col] = 'hit'
        } else {
            console.log('You Missed!')
        }
    }
  
    const checkCoordinates = array => {
      let occupied = array.some(coordinates => {
        return board[coordinates[1]][coordinates[0]] != "empty";
      });
      console.log(occupied)
      return occupied;
    };
  
    const updateBoard = (array, shipNumber) => {
      for (let i = 0; i < array.length; i++) {
        let row = array[i][1];
        let col = array[i][0];
        board[row][col] = `${shipNumber}.${i}`;
      }
    };
  
    const placeShip = (shipNumber, shipLength) => {
      placedShips[shipNumber] = Ship(shipLength)
      let spaceOccupied = true;
      let potentialShipSpot;
      while (spaceOccupied === true) {
        potentialShipSpot = generateShipCoordinates(shipLength);
        console.log("Trying spot for ship legth " + shipLength);
        console.log(potentialShipSpot);
        spaceOccupied = checkCoordinates(potentialShipSpot);
      }
      
      updateBoard(potentialShipSpot,shipNumber);
      placedShipCoords[shipNumber] = JSON.stringify(potentialShipSpot);
    };
  
    for (let i = 0; i < shipSizes.length; i++) {
      placeShip(i, shipSizes[i]);
    }
  
    const getBoard = () => {
      return board;
    };
  
    return { getBoard, receiveAttack, placedShipCoords, placedShips};
  };

  const test = Gameboard()
  test.getBoard()
