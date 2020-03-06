const Ship = length => {
    const getLength = () => length;
    let hitMarkers = [...Array(length)].map(x => false);
    let sunk = false;
  
    const isSunk = hitMarkers => {
      sunk = hitMarkers.every(ele => {
        return ele === 'hit';
      });
    };
  
    const hit = location => {
      hitMarkers[location] = 'hit';
      isSunk(hitMarkers);
    };
    
    const getSunk = () => {
        return sunk;
    }

    return {getSunk, hit};
  };

module.exports = Ship