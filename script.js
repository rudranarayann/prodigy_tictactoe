const boxes = document.querySelectorAll('.box');
const msgContainer = document.querySelector('.msg-container');
const msg = document.getElementById('msg');
const newBtn = document.getElementById('new-btn');
const resetBtn = document.getElementById('reset-btn');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

boxes.forEach((box, index) => {
    box.addEventListener('click', () => handleBoxClick(box, index));
});

newBtn.addEventListener('click', newGame);
resetBtn.addEventListener('click', resetGame);

function handleBoxClick(box, index) {
    if (gameState[index] !== '' || !gameActive || currentPlayer !== 'X') {
        return;
    }
    gameState[index] = currentPlayer;
    box.textContent = currentPlayer;
    checkResult();
    if (gameActive) {
        currentPlayer = 'O';
        setTimeout(aiMove, 500); // Delay AI move for better UX
    }
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        msg.textContent = `${currentPlayer} is the Winner!`;
        msgContainer.classList.remove('hide');
        return;
    }

    if (!gameState.includes('')) {
        gameActive = false;
        msg.textContent = `It's a Draw!`;
        msgContainer.classList.remove('hide');
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function resetGame() {
    gameState.fill('');
    gameActive = true;
    currentPlayer = 'X';
    boxes.forEach(box => box.textContent = '');
}

function newGame() {
    resetGame();
    msgContainer.classList.add('hide');
}

function aiMove() {
    let availableIndices = [];
    for (let i = 0; i < gameState.length; i++) {
        if (gameState[i] === '') {
            availableIndices.push(i);
        }
    }

    if (availableIndices.length > 0) {
        const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        gameState[randomIndex] = currentPlayer;
        boxes[randomIndex].textContent = currentPlayer;
        checkResult();
        if (gameActive) {
            currentPlayer = 'X';
        }
    }
}
