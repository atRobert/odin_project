const board = document.querySelector('.board');
const col = document.createElement('div');

let selectColor = 'black'
let redButton = document.querySelector('#redButton')
let greenButton = document.querySelector('#greenButton')
let blackButton = document.querySelector('#blackButton')
let randomButton = document.querySelector('#randomButton')
let choiceButton = document.querySelector('#choiceButton')
let choiceLabel = document.querySelector('#buttonLabel')
let theColor = choiceButton.value;

choiceButton.addEventListener('input', function(){
  selectColor = choiceButton.value;
  choiceLabel.style.backgroundColor = selectColor;
  choiceLabel.style.border = selectColor;
})

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
    randomButton.style.background = intervalColor;
    randomButton.style.border = intervalColor;
    if (!colors[currentIndex]) {
        currentIndex = 0;
    } else {
        currentIndex++;
    }
 }, 300);


let div_count = 0;
let boardSize = prompt('What resolution would you like? (Max 100)',50);
if (boardSize > 100){
    boardSize = 100;
}
let padSize = (500 / boardSize)/2





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