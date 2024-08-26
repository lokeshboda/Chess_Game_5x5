const board = document.getElementById('chessboard');
const currentPlayerDisplay = document.getElementById('current-player');
const selectedPieceDisplay = document.getElementById('selected-name');

let currentPlayer = 'A';
let selectedPiece = null;

const initialPieces = [
    ['A-P1', 'A-P2', 'A-H1', 'A-H2', 'A-P3'],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['B-P1', 'B-P2', 'B-H1', 'B-H2', 'B-P3']
];

let pieces = JSON.parse(JSON.stringify(initialPieces));

function renderBoard() {
    board.innerHTML = '';
    pieces.forEach((row, rowIndex) => {
        row.forEach((piece, colIndex) => {
            const square = document.createElement('div');
            square.classList.add('square');
            if (piece) {
                square.innerText = piece;
                square.onclick = () => selectPiece(rowIndex, colIndex);
            }
            board.appendChild(square);
        });
    });
}

function selectPiece(row, col) {
    const piece = pieces[row][col];
    if (piece && piece.startsWith(currentPlayer)) {
        selectedPiece = { name: piece, row, col };
        selectedPieceDisplay.innerText = piece;
        renderBoard();
        document.querySelectorAll('.square')[row * 5 + col].classList.add('selected');
    }
}

function movePiece(direction) {
    if (!selectedPiece) return;

    let { row, col, name } = selectedPiece;

    switch (name.split('-')[1]) {
        case 'P1':
        case 'P2':
        case 'P3':
            movePawn(row, col, direction);
            break;
        case 'H1':
            moveHero1(row, col, direction);
            break;
        case 'H2':
            moveHero2(row, col, direction);
            break;
    }

    renderBoard();
}

function movePawn(row, col, direction) {
    switch (direction) {
        case 'L':
            if (col > 0) col--;
            break;
        case 'R':
            if (col < 4) col++;
            break;
        case 'F':
            if (currentPlayer === 'A' && row > 0) row--;
            else if (currentPlayer === 'B' && row < 4) row++;
            break;
        case 'B':
            if (currentPlayer === 'A' && row < 4) row++;
            else if (currentPlayer === 'B' && row > 0) row--;
            break;
    }

    updatePiecePosition(row, col);
}

function moveHero1(row, col, direction) {
    switch (direction) {
        case 'L':
            if (col > 1) col -= 2;
            break;
        case 'R':
            if (col < 3) col += 2;
            break;
        case 'F':
            if (currentPlayer === 'A' && row > 1) row -= 2;
            else if (currentPlayer === 'B' && row < 3) row += 2;
            break;
        case 'B':
            if (currentPlayer === 'A' && row < 3) row += 2;
            else if (currentPlayer === 'B' && row > 1) row -= 2;
            break;
    }

    updatePiecePosition(row, col);
}

function moveHero2(row, col, direction) {
    switch (direction) {
        case 'L':
            if (col > 1) col -= 2;
            break;
        case 'R':
            if (col < 3) col += 2;
            break;
        case 'F':
            if (currentPlayer === 'A' && row > 1) row -= 2;
            else if (currentPlayer === 'B' && row < 3) row += 2;
            break;
        case 'B':
            if (currentPlayer === 'A' && row < 3) row += 2;
            else if (currentPlayer === 'B' && row > 1) row -= 2;
            break;
    }

    updatePiecePosition(row, col);
}

function updatePiecePosition(row, col) {
    if (pieces[row][col] === '' || (pieces[row][col] && !pieces[row][col].startsWith(currentPlayer))) {
        pieces[selectedPiece.row][selectedPiece.col] = '';
        pieces[row][col] = selectedPiece.name;
        selectedPiece.row = row;
        selectedPiece.col = col;

        if (checkWinCondition()) {
            showWinMessage(currentPlayer);
            return;
        }

        switchPlayer();
    }
}

function checkWinCondition() {
    const opponent = currentPlayer === 'A' ? 'B' : 'A';
    return pieces.flat().every(piece => !piece || !piece.startsWith(opponent));
}

function showWinMessage(winner) {
    alert(`${winner} wins the match!!`);
    resetGame();
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'A' ? 'B' : 'A';
    currentPlayerDisplay.innerText = currentPlayer;
    selectedPiece = null;
    selectedPieceDisplay.innerText = 'None';
}

function resetGame() {
    pieces = JSON.parse(JSON.stringify(initialPieces));
    currentPlayer = 'A';
    currentPlayerDisplay.innerText = currentPlayer;
    selectedPiece = null;
    selectedPieceDisplay.innerText = 'None';
    renderBoard();
}

renderBoard();
