const playerBoard = () =>{
    let shipsNeeded = [4,3,2,2,1,1,1]
    let shipNumber = 0
    let placeCoords = []
    let shipPoints = []
    let horizontal = true
    let placingShips = true

    document.getElementById('flip').addEventListener('click',function(e){
        horizontal = !horizontal
        document.getElementById('set-ship-board').innerHTML = ''
        
        generateComputerBoard(shipsNeeded[shipNumber])
    })

    let getShipPoints = () => {
        if (!placingShips){
            document.getElementById('set-ship-display').innerHTML = ''
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
        if (horizontal){
            col.addEventListener('mouseenter', function(e){
                for (let z = colNum; z<colNum+shipSize && z<10; z++){
                    document.querySelector(`[row="${rowNum}"][col="${z}"][boat="false"]`).style.background = 'rgba(115, 16, 16, 0.66)'
                }
            })
            
            col.addEventListener('mouseleave', function(e){
                for (let z = colNum; z<colNum+shipSize; z++){
                    document.querySelector(`[row="${rowNum}"][col="${z}"][boat="false"]`).style.background = 'rgba(3, 223, 252, 0.31)'
                }  
            })
            col.addEventListener('click', function(e){
                let boatCoords = []
                let spotsOfInterest = []
                for (let z = colNum; z<colNum+shipSize && z<10; z++){
                    spotsOfInterest.push(document.querySelector(`[row="${rowNum}"][col="${z}"][owner="computer"]`))
                    boatCoords.push(`${rowNum},${z}`)
                }
                let spaceClear = spotsOfInterest.every(x => x.getAttribute('boat')=="false")
                if (spaceClear && placingShips){
                    for (let i = 0; i<spotsOfInterest.length; i++){
                        spotsOfInterest[i].style.background = 'black'
                        spotsOfInterest[i].setAttribute('boat','true')
                        let box = spotsOfInterest[i]
                        let boxClone = box.cloneNode(true)
                        box.parentNode.replaceChild(boxClone,box)
                    }
                    boatCoords.every(x => placeCoords.push(x))
                    shipPoints.push({coord:`${rowNum},${colNum}`,horizontal:true})
                    document.getElementById('set-ship-board').innerHTML = ''
                    
                    shipNumber == 6 ? placingShips = false : {}
                    generateComputerBoard(shipsNeeded[++shipNumber])
                }
                
    
                
            })
        } else{
            col.addEventListener('mouseenter', function(e){
                for (let z = rowNum; z<rowNum+shipSize && z<10; z++){
                    
                    document.querySelector(`[row="${z}"][col="${colNum}"][boat="false"]`).style.background = 'rgba(115, 16, 16, 0.66)'
                }
            })
            
            col.addEventListener('mouseleave', function(e){
                for (let z = rowNum; z<rowNum+shipSize && z<10; z++){
                    
                    document.querySelector(`[row="${z}"][col="${colNum}"][boat="false"]`).style.background = 'rgba(3, 223, 252, 0.31)'
                }  
            })
            col.addEventListener('click', function(e){
                let boatCoords = []
                let spotsOfInterest = []
                for (let z = rowNum; z<rowNum+shipSize && z<10; z++){
                    spotsOfInterest.push(document.querySelector(`[row="${z}"][col="${colNum}"][owner="computer"]`))
                    boatCoords.push(`${z},${colNum}`)
                }
                let spaceClear = spotsOfInterest.every(x => x.getAttribute('boat')=="false")
                if (spaceClear && placingShips){
                    for (let i = 0; i<spotsOfInterest.length; i++){
                        spotsOfInterest[i].style.background = 'black'
                        spotsOfInterest[i].setAttribute('boat','true')
                        let box = spotsOfInterest[i]
                        let boxClone = box.cloneNode(true)
                        box.parentNode.replaceChild(boxClone,box)
                    }
                    boatCoords.every(x => placeCoords.push(x))
                    shipPoints.push({coord:`${rowNum},${colNum}`,horizontal:false})
                    document.getElementById('set-ship-board').innerHTML = ''
                    
                    shipNumber == 6 ? placingShips = false : {}
                    generateComputerBoard(shipsNeeded[++shipNumber])
                }    
            })
        }
        
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
    
    const generateComputerBoard = (shipsNeeded) => {
        let computerDisplay = document.getElementById("set-ship-board");
        for (let rowNum = 0; rowNum < 8; rowNum++) {
          let row = generateRow(rowNum);
          for (let colNum = 0; colNum < 8; colNum++) {
            let col = generateCol(rowNum, colNum);
            col.setAttribute("owner", "computer");
            
            if (!placeCoords.includes(`${rowNum},${colNum}`)){
                col.setAttribute("boat","false")
                addListeners(col, shipsNeeded, rowNum, colNum, horizontal)
            } else {
                col.style['background'] = 'black'
                col.setAttribute('boat','true')
            }

            row.appendChild(col);
          }
          computerDisplay.appendChild(row);
        }
    
    };

    generateComputerBoard(shipsNeeded[shipNumber])
    return {getShipPoints}
}




module.exports = playerBoard