const squareElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const resultMessageTxtElement = document.querySelector("[data-result-message-txt]");
const resultMessage = document.querySelector("[data-result]");
const restartButton = document.querySelector("[data-restart-button]");

let isCircleTurn;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


const startGame = () => {
    for (const square of squareElements){
        square.classList.remove("circle");
        square.classList.remove("X");
        square.addEventListener("click", handleClick);
        square.addEventListener("click", handleClick, { once: true });  
    }

    let isCircleTurn = false;

    board.classList.add("X");
    resultMessage.classList.remove("show-result");
};

const endGame = (isDraw) => {
    if (isDraw) {
        resultMessageTxtElement.innerText = "Empate!";
    }else{
        resultMessageTxtElement.innerText = isCircleTurn
        ?   "O Venceu!"
        :   "X Venceu!";
    }
    resultMessage.classList.add("show-result");
};

const checkForWin = (currentPlayer) => {
    return winningCombinations.some(combinations => {
        return combinations.every((index) => {
            return squareElements[index].classList.contains(currentPlayer)
        });
    });
};

const checkForDraw = () => {
    return [...squareElements].every((square) => {
        return square.classList.contains("X") || square .classList.contains("circle");
      });
};

const locationFigure = (square, classToAdd) => {
    square.classList.add(classToAdd);
}
const changeTurns = () => {
    isCircleTurn = !isCircleTurn;

    board.classList.remove('circle');
    board.classList.remove('X');

    if(isCircleTurn){
        board.classList.add('circle');
    }else{
        board.classList.add('X');
    }
};

const handleClick = (e) => {
    //colocar a marca (x ou circle)
    const square = e.target;
    const classToAdd = isCircleTurn ? "circle" : "X";

    locationFigure(square, classToAdd);

    //verificar por vitória
    const isWin = checkForWin(classToAdd);
    
    //verificar por empate
    const isDraw = checkForDraw();
    if (isWin) {
        endGame(false);
    }else if(isDraw){
        endGame(true)
    }else{
      //mudar o símbolo
    changeTurns();  
    }
   
    
};

startGame();

restartButton.addEventListener("click", startGame);


