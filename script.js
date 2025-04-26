const gameArea = document.getElementById("game-area");
const targetDisplay = document.getElementById("target-number");
const scoreDisplay = document.getElementById("score");
const levelDisplay = document.getElementById("level-display");
const rewardScreen = document.getElementById("reward-screen");
const startBtn = document.getElementById("start-btn");
const instructionModal = document.getElementById("instruction-modal");

let score = 0;
let level = 1;
let targetNumber = 3;
let bubblesPopped = 0;
let gameInterval;
let startTime;
let endTime;
let timerInterval;
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

    const clickedNumber = parseInt(bubble.innerText);
    bubble.remove();

    if (clickedNumber === targetNumber) {
      score++;
      bubblesPopped++;
      scoreDisplay.innerText = "Score: " + score;
      checkLevelComplete();
    } else {
      endGame(false); // Wrong bubble
    }
  });

  gameArea.appendChild(bubble);

  setTimeout(() => {
    if (gameArea.contains(bubble)) {
      gameArea.removeChild(bubble);
    }
  }, 5000);
}

function startGame() {
  score = 0;
  level = 1;
  scoreDisplay.innerText = "Score: 0";
  rewardScreen.classList.add("hidden");
  startBtn.classList.add("hidden");
  document.getElementById("result-message")?.remove();

  startTime = Date.now();
  startTimer();
  startLevel();
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
  clearInterval(gameInterval);
  setTimeout(() => {
    level++;
    if (level > maxLevel) {
      endGame(true); // Completed all levels
    } else {
      startLevel();
    }
  }, 1000);
}

function checkLevelComplete() {
  if (bubblesPopped >= bubblesPerLevel) {
    clearInterval(gameInterval);
    nextLevel();
  }
}

function startTimer() {
  timerInterval = setInterval(() => {
    const currentTime = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById("timer")?.remove();
    const timerDisplay = document.createElement("p");
    timerDisplay.id = "timer";
    timerDisplay.innerText = `⏱️ Time: ${currentTime}s`;
    scoreDisplay.insertAdjacentElement("afterend", timerDisplay);
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  endTime = Date.now();
}

function endGame(completed) {
  isGameRunning = false;
  clearInterval(gameInterval);
  stopTimer();
  gameArea.innerHTML = "";

  const timeTaken = Math.floor((endTime - startTime) / 1000);
  const totalCorrect = score; // real correct bubbles popped
  const finalScoreOutOf10 = Math.round((score / (maxLevel * bubblesPerLevel)) * 10);

  const message = document.createElement("div");
  message.id = "result-message";

  if (completed) {
    message.innerHTML = `
      <h2>🎉 You Completed All Levels!</h2>
      <p>Final Score: ${finalScoreOutOf10}/10</p>
      <p>Total Correct Bubbles: ${totalCorrect}</p>
      <p>Total Time: ${timeTaken}s</p>`;
  } else {
    message.innerHTML = `
      <h2>❌ Game Over!</h2>
      <p>You popped the wrong bubble.</p>
      <p>Score: ${totalCorrect}</p>
      <p>Time: ${timeTaken}s</p>`;
  }

  rewardScreen.innerHTML = "";
  rewardScreen.appendChild(message);

  const playAgainBtn = document.createElement("button");
  playAgainBtn.textContent = "Play Again";
  playAgainBtn.onclick = restartGame;

  rewardScreen.appendChild(playAgainBtn);
  rewardScreen.classList.remove("hidden");
  startBtn.classList.remove("hidden");
}


function restartGame() {
  startGame();
}

function openInstructions() {
  instructionModal.classList.remove("hidden");
  startBtn.classList.remove("hidden");
}

function closeInstructions() {
  instructionModal.classList.add("hidden");
}

// Show instructions only once when page loads
window.onload = openInstructions;
