// Get the elements from the HTML
const boardSizeSelect = document.getElementById("boardSize");
const startButton = document.getElementById("startButton");
const gameContainer = document.getElementById("gameContainer");
const gameBoard = document.getElementById("gameBoard");
const scoreElement = document.getElementById("score");
const menuButton = document.getElementById("menuButton");
const restartMenu = document.getElementById("restartMenu");
const finalScoreElement = document.getElementById("finalScore");
const restartButton = document.getElementById("restartButton");
const winMenu = document.getElementById("winMenu");
const winScore = document.getElementById("winScore");
const winMenuButton = document.getElementById("winMenuButton");

// Constants
const n_fielders = 11;
const n_flash_powerup = 3;
const HIGH_SCORE_KEY = "minesweeperCricketHighScore";

// Variables
let score = 0;
let fielders = [];
let highScore = 0;

// Add event listeners
startButton.addEventListener("click", startGame);
menuButton.addEventListener("click", resetGame);
restartButton.addEventListener("click", resetGame);
winMenuButton.addEventListener("click", resetGame);


// Get the high score from local storage if it exists
if (localStorage.getItem(HIGH_SCORE_KEY)) {
    highScore = parseInt(localStorage.getItem(HIGH_SCORE_KEY));
    updateHighScore();
}

// Function to update the high score
function updateHighScore() {
    const highScoreElement = document.getElementById("highScore");
    highScoreElement.textContent = highScore;
}

// Function to check and update the high score
function checkAndUpdateHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem(HIGH_SCORE_KEY, highScore);
        updateHighScore();
    }
}

// Function to flash fielder cells
function flashFielders() {
    const fielderBlocks = document.querySelectorAll(".fielder");
    const flashTime = 1000;

    fielderBlocks.forEach((fielderBlock) => {
        fielderBlock.style.backgroundColor = "red";
    });

    setTimeout(() => {
        fielderBlocks.forEach((fielderBlock) => {
            fielderBlock.style.backgroundColor = "";
        });
    }, flashTime);
}

// Function to flash powerup cells
function flashPowerups() {
    const powerupBlocks = document.querySelectorAll(".powerup");
    const flashTime = 1000;

    powerupBlocks.forEach((powerupBlock) => {
        powerupBlock.style.backgroundColor = "yellow";
        setTimeout(() => {
            powerupBlock.style.backgroundColor = "";
        }, flashTime);
    });
}

// Function to start the game
function startGame() {
    const boardSize = parseInt(boardSizeSelect.value);
    const flashTime = 10000;

    // Clear start menu
    const startMenu = document.querySelector(".container");
    startMenu.classList.add("hidden");

    // Show game board
    gameContainer.classList.remove("hidden");

    // Create the game grid
    createGameGrid(boardSize);

    // Place fielders and powerups randomly
    placeFielders(boardSize);
    placePowerups(boardSize);

    // Flash fielders and powerups
    setTimeout(() => {
        flashFielders();
        setTimeout(() => {
            flashFielders();
        }, flashTime);
    }, 0);

    // Reset score
    score = 0;
    scoreElement.textContent = score;
}

// Function to create the game grid
function createGameGrid(boardSize) {
    // Clear previous grid if any
    gameBoard.innerHTML = "";

    // Set the grid style
    gameBoard.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;

    // Create the blocks
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const block = document.createElement("div");
            block.classList.add("block");
            block.addEventListener("click", () => {
                if (block.classList.contains("fielder")) {
                    block.style.backgroundColor = "red";
                    setTimeout(() => {
                        showRestartMenu();
                    }, 100);
                } else if (block.classList.contains("powerup")) {
                    block.style.backgroundColor = "yellow";
                    if (!block.classList.contains("clicked")) {
                        incrementScore();
                        block.classList.add("clicked");
                        flashFielders();
                    }
                } else {
                    block.style.backgroundColor = "green";
                    if (!block.classList.contains("clicked")) {
                        incrementScore();
                        block.classList.add("clicked");
                        const targetScore = boardSizeSelect.value * boardSizeSelect.value - n_fielders;
                        if (score === targetScore) {
                            showWinMenu();
                        }
                    }
                }
            });
            gameBoard.appendChild(block);
        }
    }
}
// Function to place fielders randomly
function placeFielders(boardSize) {
    const totalBlocks = boardSize * boardSize;

    // Reset fielders array
    fielders = [];

    // Generate random positions for fielders
    while (fielders.length < n_fielders) {
        const randomIndex = Math.floor(Math.random() * totalBlocks);
        if (!fielders.includes(randomIndex)) {
            fielders.push(randomIndex);
        }
    }

    // Add fielder class to corresponding blocks
    const blocks = gameBoard.querySelectorAll(".block");
    fielders.forEach((fielderIndex) => {
        blocks[fielderIndex].classList.add("fielder");
    });
}

// Function to place powerups randomly
function placePowerups(boardSize) {
    const totalBlocks = boardSize * boardSize;

    // Generate random positions for powerups
    let powerupCount = 0;
    while (powerupCount < n_flash_powerup) {
        const randomIndex = Math.floor(Math.random() * totalBlocks);
        const blocks = gameBoard.querySelectorAll(".block");
        const isFielder = blocks[randomIndex].classList.contains("fielder");
        const isPowerup = blocks[randomIndex].classList.contains("powerup");

        if (!isFielder && !isPowerup) {
            blocks[randomIndex].classList.add("powerup");
            powerupCount++;
        }
    }
}

// Function to increment the score
function incrementScore() {
    score++;
    scoreElement.textContent = score;
}

// Function to show the restart menu
function showRestartMenu() {
    // Check and update the high score
    checkAndUpdateHighScore();

    // Hide game board
    gameContainer.classList.add("hidden");

    // Show restart menu
    restartMenu.classList.remove("hidden");

    // Display final score
    finalScoreElement.textContent = "Final Score: " + score;
}

// Function to show the win menu
function showWinMenu() {
    // Check and update the high score
    checkAndUpdateHighScore();

    // Hide game board
    gameContainer.classList.add("hidden");

    // Show win menu
    winScore.textContent = "Your Score: " + score;
    winMenu.classList.remove("hidden");
}

function resetScore() {
    score = 0;
    scoreElement.textContent = score;
}

// Function to reset the game board
function resetGameBoard() {
    const blocks = gameBoard.querySelectorAll(".block");
    blocks.forEach((block) => {
        block.classList.remove("clicked");
        block.style.backgroundColor = "";
    });
}

// Function to reset the game
function resetGame() {
    // Clear game board
    resetGameBoard();

    // Hide game board, restart menu, and win menu
    gameContainer.classList.add("hidden");
    restartMenu.classList.add("hidden");
    winMenu.classList.add("hidden");

    // Show start menu
    const startMenu = document.querySelector(".container");
    startMenu.classList.remove("hidden");

    // Reset score
    resetScore();

    updateHighScore();
}

// Function to reset the score and game board
function resetScoreAndGameBoard() {
    score = 0;
    scoreElement.textContent = score;
    resetGameBoard();
}

// Function to go back to the main menu
function goToMainMenu() {
    // Hide game container, restart menu, and win menu
    gameContainer.classList.add("hidden");
    restartMenu.classList.add("hidden");
    winMenu.classList.add("hidden");

    // Show start menu
    const startMenu = document.querySelector(".container");
    startMenu.classList.remove("hidden");

    // Reset score and game board
    resetScoreAndGameBoard();
}

// Initialize the game
resetGame();