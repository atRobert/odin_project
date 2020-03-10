const Ship = (length, coords) => {
    let hitMarkers = [...Array(length)].map(x => false);
    let shipCoords = [...coords].map(x => x.toString())
    let _sunk = false;
  
    const isSunk = hitMarkers => {
      _sunk = hitMarkers.every(ele => {
        return ele === 'hit';
      });
    };
  
    const hit = location => {
      hitMarkers[location] = 'hit';
      isSunk(hitMarkers);
    };
    
    const getSunk = () => {
        return _sunk;
    }
    console.log(shipCoords)
    return {getSunk, hit, shipCoords};
  };

module.exports = Ship