const Ship = require('../ship/ship.js')

const Gameboard = () => {
    const placedShips = [];
    const shipSizes = [3,3,2, 2, 2,1, 1];
    const bufferCoords = []
    const getRandomInt = max => {
      return Math.floor(Math.random() * Math.floor(max));
    };
  
    const generateShipCoordinatesVertical = shipLength => {
      let shipOrigin = [getRandomInt(10), getRandomInt(10 - shipLength)];
  
      let shipCoords = [shipOrigin];
  
      let i = shipOrigin[1];
      while (shipCoords.length < shipLength) {
        let lastSection = shipCoords.slice(0, 1);
        lastSection = [lastSection[0][0], ++i];
        shipCoords.unshift(lastSection);
      }
      return shipCoords;
    };
  
    const generateShipCoordinatesHorizontal = shipLength => {
      let shipOrigin = [getRandomInt(10 - shipLength), getRandomInt(10)];
  
      let shipCoords = [shipOrigin];
      let i = shipOrigin[0];
  
      while (shipCoords.length < shipLength) {
        let lastSection = shipCoords.slice(0, 1);
        lastSection = [++i, lastSection[0][1]];
  
        shipCoords.unshift(lastSection);
      }
      return shipCoords;
    };
  
    const checkCoordinates = array => {
      let stringArray = [...array].map(x => x.toString());
      let spaceOccupied = placedShips.some(ship => {
        return ship.shipCoords.some(x => {
          return stringArray.includes(x);
        });
      });
      let shipBuffer = bufferCoords.some(x => {
          return stringArray.includes(x)
      })
      return spaceOccupied || shipBuffer;
    };

    const generateBuffer = (shipCoords) => {
      for (let coord = 0; coord < shipCoords.length; coord++){
        let row = shipCoords[coord][0]
        let col = shipCoords[coord][1]
        bufferCoords.push([row+1,col+1].toString())
        bufferCoords.push([row+1,col].toString())
        bufferCoords.push([row+1,col-1].toString())
        bufferCoords.push([row,col-1].toString())
        bufferCoords.push([row,col+1].toString())
        bufferCoords.push([row-1,col-1].toString())
        bufferCoords.push([row-1,col+1].toString())
        bufferCoords.push([row-1,col].toString())
      }
    }
  
    const placeShip = (shipNumber, shipLength) => {
      let spaceOccupied = true;
      let potentialShipSpot;
      let orientation;
      let breakfunction = 0;
      let potentialOrientation = [
        generateShipCoordinatesVertical(shipLength),
        generateShipCoordinatesHorizontal(shipLength)
      ];
      while (spaceOccupied === true && breakfunction < 50) {
        orientation = getRandomInt(2);
        potentialShipSpot = potentialOrientation[orientation];
        spaceOccupied = checkCoordinates(potentialShipSpot);
        breakfunction++;
      }
      console.log(potentialShipSpot)
      generateBuffer(potentialShipSpot)
      placedShips[shipNumber] = Ship(shipLength, potentialShipSpot);
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
        return [true,(placedShips[shipIndex].getSunk()),'hit!'];
      } else {
        return [false, false,"You Missed!"];
      }
    };
  
    for (let i = 0; i < shipSizes.length; i++) {
      placeShip(i, shipSizes[i]);
    }
  
    return { placedShips, receiveAttack, bufferCoords };
  };

module.exports = Gameboard