const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const pauseButton = document.getElementById('pause-button');
const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const levelDisplay = document.getElementById('level');

let score = 0;
let timeLeft = 30;
let level = 1;
let gameInterval;
let targetInterval;
let isPaused = false;

function startGame() {
    score = 0;
    timeLeft = 30;
    level = 1;
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time Left: ${timeLeft}`;
    levelDisplay.textContent = `Level: ${level}`;
    startButton.style.display = 'none';
    pauseButton.style.display = 'inline-block';
    restartButton.style.display = 'none';
    gameInterval = setInterval(updateTimer, 1000);
    spawnTarget();
}

function pauseGame() {
    if (!isPaused) {
        clearInterval(gameInterval);
        clearInterval(targetInterval);
        pauseButton.textContent = 'Resume';
    } else {
        gameInterval = setInterval(updateTimer, 1000);
        spawnTarget();
        pauseButton.textContent = 'Pause';
    }
    isPaused = !isPaused;
}

function restartGame() {
    clearInterval(gameInterval);
    clearInterval(targetInterval);
    gameArea.innerHTML = '';
    startGame();
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${timeLeft}`;
    } else {
        endGame();
    }
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(targetInterval);
    gameArea.innerHTML = '';
    restartButton.style.display = 'inline-block';
    pauseButton.style.display = 'none';
    startButton.style.display = 'none';
}

function spawnTarget() {
    if (timeLeft > 0) {
        const target = document.createElement('div');
        target.classList.add('target');
        const size = Math.max(30, 100 - level * 10);
        target.style.width = `${size}px`;
        target.style.height = `${size}px`;
        target.style.top = `${Math.random() * (gameArea.clientHeight - size)}px`;
        target.style.left = `${Math.random() * (gameArea.clientWidth - size)}px`;

        target.addEventListener('click', () => {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            if (score % 10 === 0) {
                level++;
                levelDisplay.textContent = `Level: ${level}`;
            }
            gameArea.removeChild(target);
            spawnTarget();
        });

        gameArea.appendChild(target);
        clearInterval(targetInterval);
        targetInterval = setTimeout(() => {
            if (gameArea.contains(target)) {
                gameArea.removeChild(target);
                spawnTarget();
            }
        }, Math.max(1000 - level * 100, 300));
    }
}

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
pauseButton.addEventListener('click', pauseGame);
