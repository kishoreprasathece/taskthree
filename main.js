function createBoard() {
    let container = document.querySelector('.container');
    let board = document.createElement('div');
    board.setAttribute('class', 'board');

    for (let row = 1; row <= 4; row++) {
        let rowElement = document.createElement('div');
        rowElement.setAttribute('class', 'row');

        for (let square = 1; square <= 5; square++) {
            let squareElement = document.createElement('button');
            squareElement.setAttribute('class', 'square');
            squareElement.setAttribute('data-index', (row - 1) * 5 + (square - 1));
            rowElement.appendChild(squareElement);
        }

        board.appendChild(rowElement);
    }

    container.appendChild(board);
}

createBoard();

let firstPick = null;
let secondPick = null;
let isClickable = true;

const colors = [
    'red', 'blue', 'green', 'yellow', 'orange',
    'purple', 'pink', 'brown', 'cyan', 'lime',
    'red', 'blue', 'green', 'yellow', 'orange',
    'purple', 'pink', 'brown', 'cyan', 'lime'
];


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(colors);

let restartButton = document.getElementById('restart');
restartButton.addEventListener('click', function() {
    shuffle(colors);
    resetBoard();
});

function resetBoard() {
    let squares = document.getElementsByClassName('square');
    for (let square of squares) {
        square.style.backgroundColor = '';
        square.style.transform = '';
    }
    firstPick = null;
    secondPick = null;
    isClickable = true;
}

let squares = document.getElementsByClassName('square');

for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', function() {
        if (!isClickable || this.style.backgroundColor !== '') return;

        this.style.backgroundColor = colors[i];
        this.style.transform = 'rotate(180deg)';

        if (!firstPick) {
            firstPick = this;
        } else {
            secondPick = this;
            isClickable = false;

            setTimeout(() => {
                if (colors[firstPick.getAttribute('data-index')] === colors[secondPick.getAttribute('data-index')]) {
                    // It's a match
                    firstPick.style.pointerEvents = 'none'; 
                    secondPick.style.pointerEvents = 'none';
                } else {
                    // Not a match
                    firstPick.style.backgroundColor = '';
                    secondPick.style.backgroundColor = '';
                }
                firstPick = null;
                secondPick = null;
                isClickable = true;
            }, 600);
        }
    });
}
