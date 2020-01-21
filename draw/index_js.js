const board = document.querySelector('.board');

const col = document.createElement('div');

let selectColor = 'black'

let redButton = document.querySelector('#red')
let greenButton = document.querySelector('#green')
let blackButton = document.querySelector('#black')
let randomButton = document.querySelector('#random')


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

randomButton.addEventListener('click', function(){
    selectColor = getRandomColor()
})

redButton.addEventListener('click', function(){
	selectColor = 'red';
});
greenButton.addEventListener('click', function(){
	selectColor = 'green';
});
blackButton.addEventListener('click', function(){
	selectColor = 'black';
});

setInterval(function () {
    let intervalColor = getRandomColor()
    btnRandom.style.background = intervalColor;
    btnRandom.style.border = intervalColor;
    if (!colors[currentIndex]) {
        currentIndex = 0;
    } else {
        currentIndex++;
    }
 }, 1000);


let div_count = 0;
let boardSize = prompt('How big do you want the pad? (Max 100)',16);
if (boardSize > 100){
    boardSize = 100;
}
let padSize = (500 / boardSize)/2

let btnRandom = document.querySelector('#random');
let colors = ['red', 'green', 'blue', 'yellow', 'pink', 'purple'];
let currentIndex = 0;



while (div_count < boardSize) {
	let row = document.createElement('div');
  row.classList.add('grid-container');
	board.appendChild(row);
  let col_count = 0
  while (col_count < boardSize) {
  	let col = document.createElement('div');
    col.style.padding = padSize + 'px';
    col.addEventListener('mouseover', function(event) {
    	event.target.style.backgroundColor = selectColor;
    })
    row.appendChild(col);
    col_count++;
  }
  div_count++;
}