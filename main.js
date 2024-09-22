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
             rowElement.appendChild(squareElement);

         }
    
         board.appendChild(rowElement);
     }
  
     container.appendChild(board);
 }
  
createBoard();

let firstPick = null;
let secondPick = null;
let flips = 0;
let pairs = 0;
let restart=null;
let isClickable = true; 

const color = [
    'red', 'blue', 'green', 'yellow', 'orange', 
    'purple', 'pink', 'brown', 'cyan', 'lime',
    'red', 'blue', 'green', 'yellow', 'orange', 
    'purple', 'pink', 'brown', 'cyan', 'lime'
];


let squares = document.getElementsByClassName('square');

for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', function() {
       
        squares[i].style.backgroundColor = color[i];

        
        squares[i].style.transform = 'rotate(180deg)';

       
        setTimeout(() => {
            squares[i].style.backgroundColor = '';
            squares[i].style.transform = 'rotate(0deg)';
        }, 600);
    });

}

function click(){
    if(color){
color.i===color.i;
return true;
    }else{
        !color.i===color.i;
        return false;
    }
}
click();

 isClickable =click();

