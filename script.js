// Updated JavaScript for Bubble Pop Game with working bubbles, instruction modal first, and level progression

const gameArea = document.getElementById("game-area");
const targetDisplay = document.getElementById("target-number");
const scoreDisplay = document.getElementById("score");
const levelDisplay = document.getElementById("level-display");
const rewardScreen = document.getElementById("reward-screen");
const startBtn = document.getElementById("start-btn");

let score = 0;
let level = 1;
let targetNumber = 3;
let bubblesPopped = 0;
let gameInterval;
let maxLevel = 5;
let bubblesPerLevel = 10;
let isGameRunning = false;

function getRandomNumber() {
  return Math.floor(Math.random() * 10);
}

function createBubble() {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  const number = getRandomNumber();
  bubble.innerText = number;

  bubble.style.left = Math.random() * (gameArea.offsetWidth - 60) + "px";
  bubble.style.animationDuration = 3 + Math.random() * 2 + "s";

  bubble.addEventListener("click", () => {
    if (!isGameRunning) return;
    if (parseInt(bubble.innerText) === targetNumber) {
      score++;
      bubblesPopped++;
      scoreDisplay.innerText = "Score: " + score;
    }
    bubble.remove();
    checkLevelComplete();
  });

  gameArea.appendChild(bubble);

  setTimeout(() => {
    if (gameArea.contains(bubble)) {
      gameArea.removeChild(bubble);
    }
  }, 5000);
}

function checkLevelComplete() {
  if (bubblesPopped >= bubblesPerLevel) {
    clearInterval(gameInterval);
    level++;
    if (level > maxLevel) {
      showRewardScreen();
    } else {
      nextLevel();
    }
  }
}

function startGame() {
  score = 0;
  level = 1;
  scoreDisplay.innerText = "Score: 0";
  rewardScreen.classList.add("hidden");
  startLevel();
  startBtn.classList.add("hidden");
}

function startLevel() {
  isGameRunning = true;
  gameArea.innerHTML = "";
  bubblesPopped = 0;
  targetNumber = getRandomNumber();
  targetDisplay.innerText = targetNumber;
  levelDisplay.innerText = "Level: " + level;
  gameInterval = setInterval(() => {
    createBubble();
  }, 700);
}

function nextLevel() {
  isGameRunning = false;
  setTimeout(() => {
    startLevel();
  }, 1000);
}

function showRewardScreen() {
  isGameRunning = false;
  gameArea.innerHTML = "";
  rewardScreen.classList.remove("hidden");
  startBtn.classList.remove("hidden");
}

function restartGame() {
  startGame();
}

// Instruction Modal
const instructionModal = document.getElementById("instruction-modal");

function openInstructions() {
  instructionModal.classList.remove("hidden");
  startBtn.classList.remove("hidden");
}

function closeInstructions() {
  instructionModal.classList.add("hidden");
}

// Show instructions on page load
window.onload = openInstructions;
