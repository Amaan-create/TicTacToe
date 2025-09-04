let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let newContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnIndicator = document.querySelector(".turn-indicator");

// new
let player1Score = document.querySelector("#player1-score");
let player2Score = document.querySelector("#player2-score");
let drawScore = document.querySelector("#draw-score");
let resetScoreBtn = document.querySelector("#reset-scoreboard");

let player1, player2;
let turnO = true; // true = Player 1 (O), false = Player 2 (X)
let moves = 0; // Track moves for draw condition

// new
let score = {
  O: 0,
  X: 0,
  draws: 0,
};

// new elements for pikachu popup
const pikachuOverlay = document.createElement("div");
pikachuOverlay.id = "pikachu-overlay";

const pikachuImage = document.createElement("img");
pikachuImage.id = "pikachu-image";
pikachuImage.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"; // official pikachu image

pikachuOverlay.appendChild(pikachuImage);
document.querySelector(".main-container").appendChild(pikachuOverlay);

// load sound
const pikaSound = new Audio("https://freesound.org/data/previews/331/331912_3248244-lq.mp3"); // pika pika sound from freesound.org

const updateScoreboard = () => {
  player1Score.innerText = `${player1} (O): ${score.O}`;
  player2Score.innerText = `${player2} (X): ${score.X}`;
  drawScore.innerText = `Draws: ${score.draws}`;
};

// Ask for player names only once
const askPlayerNames = () => {
  if (!player1 || !player2) {
    player1 = prompt("Enter Player 1's Name (O):", "Player 1") || "Player 1";
    player2 = prompt("Enter Player 2's Name (X):", "Player 2") || "Player 2";
  }
  turnIndicator.innerText = `${player1}'s Turn (O)`;
  updateScoreboard(); // new
};

// Call once at the start
askPlayerNames();

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetGame = () => {
  turnO = true;
  moves = 0;
  enableBoxes();
  newContainer.classList.add("hide");
  turnIndicator.innerText = `${player1}'s Turn (O)`;

  // new: hide pikachu overlay just in case
  pikachuOverlay.classList.remove("show");
};

// Handle box clicks
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.style.color = "blue";
      turnIndicator.innerText = `${player2}'s Turn (X)`;
    } else {
      box.innerText = "X";
      box.style.color = "red";
      turnIndicator.innerText = `${player1}'s Turn (O)`;
    }
    box.disabled = true;
    turnO = !turnO;
    moves++;
    checkWinner();
  });
});

// Disable all boxes when game ends
const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

// Reset all boxes
const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
    box.style.color = "brown";
    box.style.backgroundColor = "";
  });
};

// Show the winner
const showWinner = (winner) => {
  let winnerName = winner === "O" ? player1 : player2;
  msg.innerText = `🎉 Congratulations, ${winnerName} Wins! 🎉`;
  score[winner]++;
  updateScoreboard();
  newContainer.classList.remove("hide");
  disableBoxes();

  // new: show pikachu and play sound
  pikachuOverlay.classList.add("show");
  pikaSound.currentTime = 0;
  pikaSound.play();

  // hide pikachu after animation ends (~1.5s)
  setTimeout(() => {
    pikachuOverlay.classList.remove("show");
  }, 1500);
};

// function to highlight the winning pattern
const highlight = (a, b, c) => {
  boxes[a].style.backgroundColor = "aqua";
  boxes[b].style.backgroundColor = "aqua";
  boxes[c].style.backgroundColor = "aqua";
};

// Check for win or draw
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    let pos1 = boxes[a].innerText;
    let pos2 = boxes[b].innerText;
    let pos3 = boxes[c].innerText;

    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      highlight(a, b, c);
      showWinner(pos1);
      return;
    }
  }

  // Check for draw after all moves are made
  if (moves === 9) {
    msg.innerText = "😢 It's a Draw! Try Again!";
    score.draws++;
    updateScoreboard();
    newContainer.classList.remove("hide");
    disableBoxes();
  }
};

// Event Listeners
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

// new
resetScoreBtn.addEventListener("click", () => {
  score.O = 0;
  score.X = 0;
  score.draws = 0;
  updateScoreboard();
});
