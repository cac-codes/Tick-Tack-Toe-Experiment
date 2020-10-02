
var classNames = {
    cell: "cell",
    populated: 'populated',
    winner: "winner",
    cellText: 'cell-text',

};

var player = {
    x: "X",
    o: "O"
};

var winnerType = {
    tie: "tie"
};


var winningCombinations = {
    0: [[1,2],[3,6],[4,8]],
    1: [[0,2],[4,7]],
    2: [[0,1],[5,8],[4,6]],
    3: [[0,6],[4,5]],
    4: [[2,6],[3,5],[1,7],[0,8]],
    5: [[3,4],[2,8]],
    6: [[7,8],[0,3],[2,4]],
    7: [[6,8],[1,4]],
    8: [[6,7],[2,5],[0,4]]
};

var cellValues = ["", "", "", "", "", "", "", "", ""];
var isNextPlayerX = true;
var winningPlayer;
var numberOfTurnsLeft = 9;
var winningCombination = [];

var cells = document.querySelectorAll('.' + classNames.cell);

///overlay screen///
var screenOverlay = document.querySelector('#screen-overlay');
var winnerDetails = document.querySelector('#winner-container > span');
var newGameBtn = document.querySelector('#new-game-button')

///calculate winner///


var calculateWinner = function(chosenIndex){
    var winningranges = winningCombinations[chosenIndex];

    for(var index = 0; index < winningranges.length; index=index+1) {
        var currentEntry = cellValues[chosenIndex];
        var firstOption = cellValues[winningranges[index][0]];
        var secondOption = cellValues[winningranges[index][1]];

        if(currentEntry === firstOption && firstOption === secondOption){
         winningPlayer = currentEntry;
         winningCombination= [chosenIndex, [winningranges[index][0]], [winningranges[index][1]]]
         return true;
        }
    }
//all the turns are gone then its a draw///
    if (numberOfTurnsLeft ===0) {
        winningPlayer = winnerType.tie;
//winning combination blank///
        winningCombination = []
        return true;
    }
    return false;
};


var showLastScreen = function(){
    if (winningPlayer === winnerType.tie){
        winnerDetails.innerHTML = "A draw.";
    } else {
        winnerDetails.innerHTML = "Winner is" + winningPlayer;
    }

    screenOverlay.style.display = 'flex'
};


var highlightWinningCells = function(){
    cells[winningCombination[0]].classList.add(classNames.winner);
    cells[winningCombination[1]].classList.add(classNames.winner);
    cells[winningCombination[2]].classList.add(classNames.winner);
};



//reset display
var resetGame = function(){

    cellValues = ["", "", "", "", "", "", "", "", ""];
    isNextPlayerX = true;
    winningPlayer;
    numberOfTurnsLeft = 9;
    winningCombination = [];
    
    ////trying to clear all the celltext
    for (var index = 0; index < cells.length; index = index + 1){
        var cell = cells[index];
        var cellText = cell.querySelector('.' + classNames.cellText);
        cellText.innerHTML = cellValues[index];
        cellText.classList.remove(classNames.populated);
        cell.classList.remove(classNames.winner);   
    }

    screenOverlay.style.display = 'none'
}

newGameBtn.addEventListener('click', () => {
    resetGame();
});

cells.forEach((clicked, index) => {
    clicked.addEventListener('click', () => {
        if (!cellValues[index]) {
            cellValues[index] = isNextPlayerX ? player.x : player.o;
            isNextPlayerX = !isNextPlayerX;
            numberOfTurnsLeft--;

            if(calculateWinner(index)) {
                if(winningPlayer !== winnerType.tie){
                    highlightWinningCells();
                }
                showLastScreen();
            }

            var cellText = clicked.querySelector('.' + classNames.cellText);
            cellText.innerHTML = cellValues[index];
            cellText.classList.add(classNames.populated);
        }
    });
});


