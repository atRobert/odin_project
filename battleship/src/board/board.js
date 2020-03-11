const Ship = require('../ship/ship.js')

const Gameboard = (determinedCoords) => {
    const placedShips = [];
    const shipSizes = [4,3,2,2,1,1,1];
    const bufferCoords = new Set()
    const getRandomInt = max => {
      return Math.floor(Math.random() * Math.floor(max));
    };
  
    const generateShipCoordinatesVertical = (shipLength, determinedCoords) => {
      let shipOrigin
      if (determinedCoords){
        
        shipOrigin = determinedCoords.split(',')
      } else {
        
        shipOrigin = [getRandomInt(8), getRandomInt(8 - shipLength)];
      }
      
      let shipCoords = [shipOrigin];
  
      let i = shipOrigin[1];
      while (shipCoords.length < shipLength) {
        let lastSection = shipCoords.slice(0, 1);
        lastSection = [lastSection[0][0], ++i];
        shipCoords.unshift(lastSection);
      }
      return shipCoords;
    };

  
    const generateShipCoordinatesHorizontal = (shipLength,determinedCoords) => {
      let shipOrigin
      if (determinedCoords){

        shipOrigin = determinedCoords.split(',')
      } else {
        shipOrigin = [getRandomInt(7 - shipLength), getRandomInt(7)];
      }
      let shipCoords = [shipOrigin];
      let i = shipOrigin[0];  
      while (shipCoords.length < shipLength) {
        let lastSection = shipCoords.slice(0, 1);
        lastSection = [++i, lastSection[0][1]];
        shipCoords.unshift(lastSection);
      }
      return shipCoords;
    };

    const checkLost = () => {
      return placedShips.every(x => x.getSunk() == true)
    }
  
    const checkCoordinates = array => {
      let stringArray = [...array].map(x => x.toString());
      let spaceOccupied = stringArray.some(x => {
        return bufferCoords.has(x)
      })
      return spaceOccupied;
    };

    const generateBuffer = (shipCoords) => {
      for (let coord = 0; coord < shipCoords.length; coord++){
        let row = shipCoords[coord][0]
        let col = shipCoords[coord][1]
        bufferCoords.add([row, col].toString())
        bufferCoords.add([row+1,col+1].toString())
        bufferCoords.add([row+1,col].toString())
        bufferCoords.add([row+1,col-1].toString())
        bufferCoords.add([row,col-1].toString())
        bufferCoords.add([row,col+1].toString())
        bufferCoords.add([row-1,col-1].toString())
        bufferCoords.add([row-1,col+1].toString())
        bufferCoords.add([row-1,col].toString())
      }
    }
  
    const placeShip = (shipNumber, shipLength, shipInfo) => {  //This is where I need to put the player ship coords.
      let spaceOccupied = true;
      let potentialShipSpot
      let horizontal
      if (!shipInfo){
        let orientation
        while (spaceOccupied === true) {
          orientation = getRandomInt(2);
          let potentialOrientation = [
            generateShipCoordinatesVertical(shipLength),
            generateShipCoordinatesHorizontal(shipLength)
          ];
          
          potentialShipSpot = potentialOrientation[orientation];
          spaceOccupied = checkCoordinates(potentialShipSpot);
          spaceOccupied == true ? potentialShipSpot = '' : {}
        }
        horizontal = orientation == 1? false : true
        console.log('the ship is horizontal ' + horizontal)
        generateBuffer(potentialShipSpot)
        placedShips[shipNumber] = Ship(shipLength, potentialShipSpot, horizontal);
      } else {
        

        if (shipInfo.horizontal == true){
          potentialShipSpot = generateShipCoordinatesVertical(shipLength, shipInfo.coord)
          placedShips[shipNumber] = Ship(shipLength, potentialShipSpot, shipInfo.horizontal);
        } else{
          potentialShipSpot = generateShipCoordinatesHorizontal(shipLength, shipInfo.coord)
          placedShips[shipNumber] = Ship(shipLength, potentialShipSpot, shipInfo.horizontal);
        }
      }
    };
  
    const getShipIndex = (coordinates) => {
      let shipIndex = -1;
      for (let i = 0; i < placedShips.length; i++) {
        if (placedShips[i].shipCoords.includes(coordinates)) {
          shipIndex = i;
        }
      }
      return shipIndex;
    };
  
    const receiveAttack = coordinates => {
      const shipIndex = getShipIndex(coordinates);
      if (shipIndex != -1) {
        let shipSection = placedShips[shipIndex].shipCoords.indexOf(coordinates);
        placedShips[shipIndex].hit(shipSection);
        
        return [true,(placedShips[shipIndex].getSunk()),shipIndex,placedShips[shipIndex].getBow(), shipIndex,placedShips[shipIndex].horizontal];
      } else {
        return [false, false,-1];
      }
    };

  
    for (let i = 0; i < shipSizes.length; i++) {
      let determCoords 
      try{
        determCoords = determinedCoords[i]
      }
      catch{       
      }
      placeShip(i, shipSizes[i], determCoords);
    }
    console.log(placedShips)
    return { placedShips, receiveAttack, bufferCoords, checkLost};
  };

module.exports = Gameboard
