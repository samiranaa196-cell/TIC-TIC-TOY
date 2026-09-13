const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".status");
const restartButton = document.querySelector(".restart");

let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach((cell) => {
    cell.addEventListener("click", () => {

        if (cell.textContent !== "" || !gameActive) {
            return;
        }

        cell.textContent = currentPlayer;

        checkWinner();

        if (gameActive) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusText.textContent = `Player ${currentPlayer} ki turn`;
        }
    });
});

function checkWinner() {

    for (const combination of winningCombinations) {

        const a = cells[combination[0]].textContent;
        const b = cells[combination[1]].textContent;
        const c = cells[combination[2]].textContent;

        if (a !== "" && a === b && b === c) {
            statusText.textContent = `🎉 Player ${a} Winner!`;
            gameActive = false;
            return;
        }
    }

    const draw = [...cells].every(cell => cell.textContent !== "");

    if (draw) {
        statusText.textContent = "🤝 Game Draw!";
        gameActive = false;
    }
}

restartButton.addEventListener("click", () => {

    cells.forEach(cell => {
        cell.textContent = "";
    });

    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Player X ki turn";
});
