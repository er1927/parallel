// -------- GRID -------- //
const container = document.querySelector(".container");

let boardHeight;
let boardWidth;
let singlePlayer = true;

const submitButton = document.querySelector(".button-submit");
const clearButton = document.querySelector(".button-clear");
const newGame = document.querySelector(".button-new");
const messageDiv = document.querySelector(".message-container");
const winLoseMessage = document.querySelector(".message");
const diceRoller = document.querySelector(".button-roll");
const diceOne = document.querySelector(".dice-one");
const diceTwo = document.querySelector(".dice-two");
const placeholders = document.querySelectorAll(".placeholder");
const timerDiv = document.querySelector(".timer");
const diceDiv = document.querySelector(".roll-button-dice-container");

function createGrid() {
    // gives us the option to expand the board dimensions in two player mode
    if (singlePlayer) {
        boardHeight = 10;
        boardWidth = 10;
    } else {
        boardHeight = 20;
        boardWidth = 10;
    }

    // create 10 columns
    for (let i = 0; i < boardHeight; i++) {
        const column = document.createElement("div");
        column.classList.add("column");

        // create cells in each column
        for (let j = 0; j < boardWidth; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            column.appendChild(cell);
        }

    container.appendChild(column);
    }
}

createGrid();

// creates a node list containing each div with a class of "cell"
const cells = document.querySelectorAll(".cell");

// keep track of the cells that are clicked during each turn
let clickedCells = [];

// shade cells on the grid
function shade(event) {
    let targetCell = event.target;
    targetCell.classList.toggle("shaded");
    clickedCells.push(targetCell);
}

// use the clear button to unshade the cells that were just clicked (but not submitted) so the user can try a different combo of cells
clearButton.addEventListener("click", () => {
    clickedCells.forEach((cell) => {
        cell.classList.toggle("shaded");
    });
    clickedCells = [];
});

// FULL GRID WIN CONDITION
// create an array from the cells node list
const cellsArray = Array.from(cells);

// check if the whole grid is shaded
const checkIfAllShaded = () => {
    // checks if every cell in the array contains the shaded class; returns a boolean
    const allShaded = cellsArray.every((cell) => cell.classList.contains("shaded"));
    if(allShaded) {
        console.log("you win!")
        newGame.classList.remove("hidden");
        messageDiv.classList.remove("hidden");
        winLoseMessage.innerText = "🎉 You win! 🥳";
        clearButton.style.display = "none";
        submitButton.style.display = "none";
        diceRoller.style.display = "none";
        diceOne.style.display = "none";
        diceTwo.style.display = "none";
        timerDiv.style.display = "none";
    }
}

// -------- NEW GAME BUTTON -------- //
const newGamebutton = document.querySelector(".button-new");  
newGamebutton.addEventListener("click", function () {
// reset the timer:
resetTimer();
//clear the leaderboard:
 totalWins = 0;
 totalLoses = 0;
 losesTimer = 0;
 losesForfeit = 0;
 winsFullGrid = 0;
 displayScore();
//clear the grid:
clickedCells.forEach((cell) => {cell.classList.toggle("shaded");});
    clickedCells = [];
}); 

// -------- DICE ROLLER -------- //
diceRoller.addEventListener("click", handleRollButtonClick);

function handleRollButtonClick() {
    // adjust CSS
    diceDiv.style.justifyContent = "flex-start";
    diceDiv.style.paddingLeft = "75px";

    // when the roll button is clicked, generate random numbers between 1 and 6 for each of the die
    let diceOneValue = Math.floor(Math.random() * 6) + 1;
    let diceTwoValue = Math.floor(Math.random() * 6) + 1;

    // set the src attribute of each dice image depending on the randomly generated number
    let diceOneSrc = `img/dice${diceOneValue}.png`;
    diceOne.setAttribute('src', diceOneSrc);

    let diceTwoSrc = `img/dice${diceTwoValue}.png`;
    diceTwo.setAttribute('src', diceTwoSrc);

    // hide the placeholders when the die are rolled
    placeholders.forEach(placeholder => placeholder.style.display = "none");

    // only AFTER the roll button is clicked, shade a cell when clicked and push that cell to the clickedCells array
    cells.forEach((cell) => {
        cell.addEventListener("click", shade);
    });

    // submit button is only clickable AFTER the die are rolled
    // remove the click event listener from every cell in the clickedCells array after the submit button is clicked
    submitButton.addEventListener("click", function () { 
        clickedCells.forEach((clickedCell) =>
            clickedCell.removeEventListener("click", shade)
        );
        // empty out the array so the submitted cells don't get cleared if the clear button is clicked
        clickedCells = [];
        checkIfAllShaded();
        count = 0;
    });
}

// -------- TIMER -------- //
var timer = 60;
var interval = setInterval(function() {
    timer--;
    $('.timer').text(timer);
    if (timer === 0) clearInterval(interval);
}, 1000);

function resetTimer() {
    timer=60;
};

// -------- LEADERBOARD -------- //
// fetching icons
const totalWinsIcon = document.getElementById("totalWinsIcon")
const totalLosesIcon = document.getElementById("totalLosesIcon")
const losesTimerIcon = document.getElementById("losesTimerIcon")
const losesForfeitIcon = document.getElementById("losesForfeitIcon")
const winsFullGridIcon = document.getElementById("winsFullGridIcon")

// declaring initial values for all points
let totalWins = 1;
let totalLoses = 2;
let losesTimer = 3;
let losesForfeit = 4;
let winsFullGrid = 5;
// display functions

function displayScore() {
    totalWinsIcon.innerText = totalWins;
    totalLosesIcon.innerText = totalLoses;
    losesTimerIcon.innerText = losesTimer;
    losesForfeitIcon.innerText = losesForfeit;
    winsFullGridIcon.innerText = winsFullGrid;
}
displayScore();

