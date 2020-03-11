const Ship = (length, coords, horizontal) => {
    let hitMarkers = [...Array(length)].map(x => false);
    let shipCoords = [...coords].map(x => x.toString())
    let _sunk = false;
    const isSunk = hitMarkers => {
      _sunk = hitMarkers.every(ele => {
        return ele === 'hit';
      });
    };

    const getHorizontal = () =>{
      return horizontal
    }

    const getBow = () => {
      return shipCoords[0]
    }
  
    const hit = location => {
      hitMarkers[location] = 'hit';
      isSunk(hitMarkers);
    };
    
    const getSunk = () => {
        
        return _sunk;
    }
    return {getSunk, hit, shipCoords, getBow, horizontal};
  };

module.exports = Ship