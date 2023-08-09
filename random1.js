const cell = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
cell.forEach(cell => cell.onmouseover = function(){hovered(this, this.getAttribute("cellIndex"))});
cell.forEach(cell => cell.onmouseout = function(){unhovered(this, this.getAttribute("cellIndex"))});
function hovered(cell, index){
    if (options[index]=='' && running){
        
        cell.querySelector('span').textContent = currentPlayer;
        cell.querySelector('span').style.opacity = 0.4;
    }
}
function unhovered(cell, index){
    cell.querySelector('span').textContent = options[index];
    cell.querySelector('span').style.opacity = 1;
    
}
intializeGame();
function intializeGame (){
    cell.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");
    if (options[cellIndex]!="" || !running)
        return;
    updateCell(this, cellIndex);
    changePlayer();
    checkWinner();

}

function updateCell(cell, index)
{
    options[index] = currentPlayer;
    cell.querySelector('span').textContent = currentPlayer;
    cell.querySelector('span').style.opacity = 1;

}

function changePlayer(){
    currentPlayer = (currentPlayer=='X') ? 'O' : 'X';
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
    let roundWon = false;

    for (let i = 0 ; i<winConditions.length ; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA=='' || cellB=='' || cellC==''){
            continue;}
        if (cellA==cellB && cellB==cellC){
            roundWon=true;
            break;}
    }
    
    if (roundWon){
        changePlayer();
        statusText.textContent = `${currentPlayer} won!`;
        running = false;}
    else if (!options.includes(''))
    {
        statusText.textContent = "It's a draw!";
        running = false;
    }
}

function restartGame(){
    running = true;
    for (i = 0 ; i<options.length ; i++)
        options[i]='';
    cell.forEach(cell => cell.querySelector('span').textContent = "");
    currentPlayer = 'X';
    statusText.textContent = `${currentPlayer}'s turn`;
}

