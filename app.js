let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let newContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnIndicator = document.querySelector(".turn-indicator");

let player1, player2;
let turnO = true; // true = Player 1 (O), false = Player 2 (X)
let moves = 0; // Track moves for draw condition

// Ask for player names only once
const askPlayerNames = () => {
  if (!player1 || !player2) {
    player1 = prompt("Enter Player 1's Name (O):", "Player 1") || "Player 1";
    player2 = prompt("Enter Player 2's Name (X):", "Player 2") || "Player 2";
  }
  turnIndicator.innerText = `${player1}'s Turn (O)`;
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
  newContainer.classList.remove("hide");
  disableBoxes();
};

// function to highlight thw winning pattern

const highlight = (a,b,c) => {
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
      highlight(a,b,c);
      showWinner(pos1);
      return;
    }
  }

  // Check for draw after all moves are made
  if (moves === 9) {
    msg.innerText = "😢 It's a Draw! Try Again!";
    newContainer.classList.remove("hide");
    disableBoxes();
  }
};

// Event Listeners
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

