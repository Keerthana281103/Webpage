const bird = document.getElementById('bird');
const pipeTop = document.getElementById('pipe-top');
const pipeBottom = document.getElementById('pipe-bottom');
const scoreDisplay = document.getElementById('score');
const gameContainer = document.getElementById('game-container');

let birdTop = gameContainer.clientHeight / 2 - bird.clientHeight / 2;
let gravity = 2;
let jumpHeight = 60;
let score = 0;

// Function to update the bird's position
function updateBird() {
  birdTop += gravity;
  bird.style.top = `${birdTop}px`;

  const birdRect = bird.getBoundingClientRect();
  const pipeTopRect = pipeTop.getBoundingClientRect();
  const pipeBottomRect = pipeBottom.getBoundingClientRect();

  // Collision detection
  if (
    birdRect.bottom >= gameContainer.clientHeight || // Hits ground
    birdRect.top <= 0 || // Hits ceiling
    (birdRect.right >= pipeTopRect.left &&
      (birdRect.top <= pipeTopRect.bottom || birdRect.bottom >= pipeBottomRect.top))
  ) {
    gameOver();
  }
}

// Function to make the bird jump
function jump() {
  birdTop -= jumpHeight;
  bird.style.transform = "rotate(-20deg)";
  setTimeout(() => (bird.style.transform = "rotate(0deg)"), 200);
}

// Function to update the pipes' position and height
function updatePipes() {
  const pipeHeight = Math.floor(Math.random() * 200) + 100;
  pipeTop.style.height = `${pipeHeight}px`;
  pipeBottom.style.height = `${gameContainer.clientHeight - pipeHeight - 150}px`;
  pipeTop.style.right = '-60px';
  pipeBottom.style.right = '-60px';
}

// Function to handle pipe reset and scoring
function checkPipeReset() {
  const pipeRight = parseInt(getComputedStyle(pipeTop).right);

  if (pipeRight >= gameContainer.clientWidth + 60) {
    score += 5; // Higher score increment
    scoreDisplay.textContent = `Score: ${score}`;
    updatePipes();
  }
}

// Game over logic
function gameOver() {
  alert(`Game Over! Your Score: ${score}`);
  window.location.reload();
}

// Event listener for jump
window.addEventListener('keydown', (e) => {
  if (e.key === ' ') jump();
});

// Game loop
setInterval(() => {
  updateBird();
  checkPipeReset();
}, 20);

updatePipes();
