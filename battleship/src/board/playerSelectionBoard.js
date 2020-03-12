const playerSelectionBoard = (shipSizes) =>{
    let shipNumber = 0
    let placedCoords = []
    let shipPoints = []     //Coordinate of Bow (Front) of ship.
    let horizontal = true  //Current Ship Placement Orientation.
    let placingShips = true //False if all ships have been placed.
    let shipCount = shipSizes.length

    document.getElementById('flip-orientation').addEventListener('click',function(e){
        horizontal = !horizontal
        document.getElementById('set-ship-board').innerHTML = ''
        generatePlayerBoard(shipSizes[shipNumber])
    })

    let shipCountDiv = document.getElementById('ship-count')
    shipCountDiv.innerText = shipCount
    let shipsPlacedButton = document.getElementById('ready')
    shipsPlacedButton.innerText = 'RANDOM'

    const getShipPoints = () => {
        if (!placingShips){
            document.getElementById('set-ship-board').innerHTML = ''
            return shipPoints
        }   
    }

    const generateRow = rowNum => {
        let row = document.createElement("div");
        row.classList.add("row");
        row.style.cssText = `height:40px;`;
        row.setAttribute("row", rowNum);
        return row;
      };

      const addListeners = (col,shipSize, rowNum, colNum, horizontal) =>{
        let boatCoords = []
        let spotsOfInterest = []
        let horCoords = []
        let verCoords = []
        const placePlayerShip = () =>{
            for (let i = 0; i<spotsOfInterest.length; i++){
                spotsOfInterest[i].style.background = 'black'
                spotsOfInterest[i].setAttribute('boat','true')
                let box = spotsOfInterest[i]
                let boxClone = box.cloneNode(true)
                box.parentNode.replaceChild(boxClone,box)
            }
            boatCoords.every(x => placedCoords.push(x))
            shipPoints.push({coord:`${rowNum},${colNum}`,horizontal:horizontal})
            document.getElementById('set-ship-board').innerHTML = ''   
            shipNumber == 6 ? placingShips = false : {}
            shipCountDiv.innerText = --shipCount
            shipCount == 0 ? 
            shipsPlacedButton.innerText = 'READY' : {}
            generatePlayerBoard(shipSizes[++shipNumber])
        }

        const pushCoords = (rowNum, colNum) =>{
            horCoords.push(colNum)
            verCoords.push(rowNum)
            boatCoords.push(`${rowNum},${colNum}`)
        }

        const changeCoordBackground = (backgroundColor) => {
            for (let i = 0; i < horCoords.length; i++){
                document.querySelector(`[row="${verCoords[i]}"][col="${horCoords[i]}"][boat="false"]`).style.background = backgroundColor
            }  
        }

        if (horizontal){
            for (let z = colNum; z<colNum+shipSize; z++){
                pushCoords(rowNum,z)
            }
        } else {
            for (let z = rowNum; z<rowNum+shipSize && z<10; z++){ 
                pushCoords(z,colNum)
            }
        }

        col.addEventListener('mouseenter', function(e){
            changeCoordBackground('rgba(115, 16, 16, 0.66)')
        })
        
        col.addEventListener('mouseleave', function(e){
            changeCoordBackground('rgba(3, 223, 252, 0.31)')
        })

        col.addEventListener('click', function(e){
            for (let i = 0; i < horCoords.length; i++){
                spotsOfInterest.push(document.querySelector(`[row="${verCoords[i]}"][col="${horCoords[i]}"][owner="computer"]`))
            }
            let spaceClear = spotsOfInterest.every(x => x.getAttribute('boat')=="false")
            if (spaceClear && placingShips){
                placePlayerShip()
            }
        
        })
      }
    
      const generateCol = (rowNum, colNum) => {
        let col = document.createElement("div");
        col.classList.add("row");
        col.setAttribute("row", rowNum);
        col.setAttribute("col", colNum);
        col.style.cssText = `height:40px;
                                        width:40px;
                                        background:rgba(3, 223, 252, 0.31);
                                        border:1px solid black;
                                        display:inline-block`;
        return col;
      };
    
    const generatePlayerBoard = (shipSizes) => {
        let computerDisplay = document.getElementById("set-ship-board");
        for (let rowNum = 0; rowNum < 8; rowNum++) {
          let row = generateRow(rowNum);
          for (let colNum = 0; colNum < 8; colNum++) {
            let col = generateCol(rowNum, colNum);
            col.setAttribute("owner", "computer");
            if (!placedCoords.includes(`${rowNum},${colNum}`)){
                col.setAttribute("boat","false")
                addListeners(col, shipSizes, rowNum, colNum, horizontal)
            } else {
                col.style['background'] = 'grey'
                col.setAttribute('boat','true')
            }

            row.appendChild(col);
          }
          computerDisplay.appendChild(row);
        }
    
    };

    generatePlayerBoard(shipSizes[shipNumber])
    return {getShipPoints}
}




module.exports = playerSelectionBoard