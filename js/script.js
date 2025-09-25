let nextTurn = "X"; // X or O
let numberOfMoves = 0;
let firstPlayer = "";
let secondPlayer = "";

// Track the count of moves for each player ("X" and "O") in each row, column, and diagonal.
let playerMoveCounts = {
    "X": { rows: { 0: 0, 1: 0, 2: 0 }, columns: { 0: 0, 1: 0, 2: 0 }, mainDiagonal: 0, secondaryDiagonal: 0 },
    
    "O": { rows: { 0: 0, 1: 0, 2: 0 }, columns: { 0: 0, 1: 0, 2: 0 }, mainDiagonal: 0, secondaryDiagonal: 0 },

    updateMoveCounts: function(x, y, currentTurn) {
        this[currentTurn].columns[x]++;
        this[currentTurn].rows[y]++;
        if (x === y){
            // Use the equality of the coordinates to identify moves on the main diagonal
            this[currentTurn].mainDiagonal++;
        }
        if ((x + y) == 2){
            // Use the sum of the coordinates to identify moves on the secondary diagonal
            this[currentTurn].secondaryDiagonal++;
        }
    }
};

function resetGame() {
    numberOfMoves = 0;
    nextTurn = "X";
    firstPlayer = "";
    secondPlayer = "";

    playerMoveCounts["X"] = { rows: { 0: 0, 1: 0, 2: 0 }, columns: { 0: 0, 1: 0, 2: 0 }, mainDiagonal: 0, secondaryDiagonal: 0 };
    playerMoveCounts["O"] = { rows: { 0: 0, 1: 0, 2: 0 }, columns: { 0: 0, 1: 0, 2: 0 }, mainDiagonal: 0, secondaryDiagonal: 0 };

    const buttons = document.querySelectorAll('#game-board > button');
    for (let button of buttons) {
        button.textContent = "";
        button.disabled = false;
    }

    document.querySelector('main p').textContent = "Click the button to start the game!";
    document.getElementById('start-button').style.display = 'block';
    document.getElementById('game-board').style.display = 'none';
}

function checkResult(currentTurn, columnCount, rowCount, mainDiagonalCount, secondaryDiagonalCount) {
    if (columnCount === 3 || rowCount === 3 || mainDiagonalCount === 3 || secondaryDiagonalCount === 3) {
        alert(`Player ${currentTurn} wins!`);
        resetGame();
        return;
    }

    if (numberOfMoves === 9) {
        alert("It's a draw!");
        resetGame();
    }
}

document.getElementById('start-button').addEventListener('click', () => {
    while(!firstPlayer) firstPlayer = window.prompt("Enter the name for Player X:");

    while(!secondPlayer) secondPlayer = window.prompt("Enter the name for Player O:");

    document.getElementById('start-button').style.display = 'none';
    document.getElementById('game-board').style.display = 'grid';
    document.querySelector('main p').textContent = `It's player ${(nextTurn == "X") ? firstPlayer : secondPlayer}'s turn!`;
});

const buttons = document.querySelectorAll('#game-board > button');
for (let button of buttons) {
    button.addEventListener('click', () => {
        const currentTurn = nextTurn;
        nextTurn = (nextTurn === "X") ? "O" : "X";

        const column = parseInt(button.dataset.column);
        const row = parseInt(button.dataset.row);

        playerMoveCounts.updateMoveCounts(column, row, currentTurn);
        numberOfMoves++;

        button.textContent = currentTurn;
        button.disabled = true;

        document.querySelector('main p').textContent = `It's player ${(nextTurn == "X") ? firstPlayer : secondPlayer}'s turn!`;

        const rowCount = playerMoveCounts[currentTurn].rows[row];
        const columnCount = playerMoveCounts[currentTurn].columns[column];
        const mainDiagonalCount = playerMoveCounts[currentTurn].mainDiagonal;
        const secondaryDiagonalCount = playerMoveCounts[currentTurn].secondaryDiagonal;
        checkResult(currentTurn, columnCount, rowCount, mainDiagonalCount, secondaryDiagonalCount);

    });
}

document.getElementById('reset-button').addEventListener('click', resetGame);