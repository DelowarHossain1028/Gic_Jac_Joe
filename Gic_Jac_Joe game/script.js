const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

function checkWin() {
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    return winCombos.some((combo) => {
        const [a, b, c] = combo;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function checkDraw() {
    return board.every((cell) => cell !== '');
}

function showMessage(msg) {
    message.innerText = msg;
    message.style.display = 'block';
    resetButton.style.display = 'block';
}

function makeMove(index) {
    if (!gameOver && board[index] === '') {
        board[index] = currentPlayer;
        cells[index].innerText = currentPlayer;
        if (checkWin()) {
            showMessage(`${currentPlayer} wins!`);
            gameOver = true;
        } else if (checkDraw()) {
            showMessage("It's a draw!");
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function resetBoard() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    message.style.display = 'none';
    resetButton.style.display = 'none';
    cells.forEach((cell) => (cell.innerText = ''));
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => makeMove(index));
});

resetButton.addEventListener('click', resetBoard);
resetBoard();
