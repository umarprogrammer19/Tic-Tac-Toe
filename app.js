let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // playerO starts
let count = 0; // To track moves and detect a draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val && pos1Val === pos2Val && pos2Val === pos3Val) {
      showWinner(pos1Val);
      return true;
    }
  }
  return false;
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "") {
      if (turnO) {
        box.innerText = "O";
      } else {
        box.innerText = "X";
      }
      box.disabled = true;
      count++;

      if (checkWinner()) {
        return;
      }

      if (count === 9) {
        gameDraw();
      }

      turnO = !turnO; // Switch turn
    }
  });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", () => {
  resetGame();
  msgContainer.classList.add("hide"); // Ensure the message is hidden when reset is clicked
});
