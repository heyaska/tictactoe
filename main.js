// variables that control games
let currentPlayer = "O";
let freeze = false;

const tileElements = document.getElementsByClassName("tile");

// OUTPUT (Boolean)
// If there's a winner, return true. Otherwise false.
const checkWinner = () => {
    //Creat Array
    const row1 = [tileElements[0].innerHTML, tileElements[1].innerHTML, tileElements[2].innerHTML];
    const row2 = [tileElements[3].innerHTML, tileElements[4].innerHTML, tileElements[5].innerHTML];
    const row3 = [tileElements[6].innerHTML, tileElements[7].innerHTML, tileElements[8].innerHTML];
    const matrix = [row1, row2, row3];
    // check horizontal
    for(let i = 0; i < matrix.length; i++){
        let currentRowSum = 0;
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === "O"){
                currentRowSum++;
            } else if(matrix[i][j] === "X"){
                currentRowSum--;
            }
        }
        if (Math.abs(currentRowSum) === 3) return true;
    }
    // check vertical
    for(let i = 0; i < row1.length; i++){
        let currentColumnSum = 0
        for(let j = 0; j < matrix.length; j++){
            if (matrix[j][i] === "O"){
                currentColumnSum++;
            } else if(matrix[j][i] === "X"){
                currentColumnSum--;
            }
        }
        if (Math.abs(currentColumnSum) === 3) return true;
    }    

    // check diagnal
    let currentDiagnalSumLR = 0
    let currentDiagnalSumRL = 0
    for(let i = 0; i < matrix.length; i++){
        if(matrix[i][i] === "O"){
            currentDiagnalSumLR++;
        } else if(matrix[i][i] === "X") {
            currentDiagnalSumLR--;
        } 
        if(matrix[i][matrix.length-i-1] === "O"){
            currentDiagnalSumRL++;
        } else if(matrix[i][matrix.length-i] === "X")
            currentDiagnalSumRL--;
    }
    if(Math.abs(currentDiagnalSumLR) === 3 || Math.abs(currentDiagnalSumRL) === 3) return true;    

    //if none of condition above worked return false
    return false;
}

// Callback Function
const tileClicked = (event) => {
    const currentTileElement = event.target;
    if (currentTileElement.innerHTML !== "") return;
    if (freeze === true) return;

    // Mark current tile
    currentTileElement.innerHTML = currentPlayer;

    // Check if the winner is decided
    const isGameOver = checkWinner(); // return if the winner is decided or not.
    if(isGameOver) {
        // Winner message: winnner is currentPlayer
        // setTimeout(function() { 
        //     window.alert("Winner is " + currentPlayer + ".");
        // }, 1)

        const winnerMessageDiv = document.createElement("div")
        winnerMessageDiv.setAttribute("id", "WMdiv");
        const winnerMessage = `Winner is ${currentPlayer}.`;
        // = "Winner is " + currentPlayer + "."
        winnerMessageDiv.innerHTML = winnerMessage
        document.getElementById("tic-tac-toe").appendChild(winnerMessageDiv);
                
        // freeze
        freeze = true
    }

    // Update Current Player
    currentPlayer = (currentPlayer === "O") ? "X" : "O";    
}

for (let i = 0; i < tileElements.length; i++) {
    const currentTileElement = tileElements[i];    
    currentTileElement.addEventListener('click', tileClicked);
}

// Arrow function
const resetButton = () => {
    for (let i = 0; i < tileElements.length; i++) {
        const currentTileElement = tileElements[i];
        currentTileElement.innerHTML = "" 
    }
    freeze = false;
    const winnerMessageDiv = document.getElementById("WMdiv");
    winnerMessageDiv.remove()
}

// 1) upon clicking, remove the winner message
// 