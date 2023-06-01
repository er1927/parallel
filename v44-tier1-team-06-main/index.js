// GRID CONTAINER
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
const noMatchMessage = document.querySelector(".no-match");
let closeButton = document.getElementById("close-button");


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
    if (targetCell.classList.contains("shaded")) {
        targetCell.classList.remove("shaded");
        // check if the cell is already in the clickedCells array
        const index = clickedCells.indexOf(targetCell);
        if (index > -1) {
            // if it is, remove it from the array
            clickedCells.splice(index, 1);
        }
    } else {
        // if it's not in the array, add it to the clickedCells arry and shade the cell
        targetCell.classList.add("shaded");
        clickedCells.push(targetCell);
    }
}

// use the clear button to unshade the cells that were just clicked (but not submitted) so the user can try a different combo of cells
clearButton.addEventListener("click", () => {
    clickedCells.forEach((cell) => {
        cell.classList.remove("shaded");
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
        clearButton.classList.add("hidden");
        submitButton.classList.add("hidden");
        diceRoller.classList.add("hidden");
        diceOne.classList.add("hidden");
        diceTwo.classList.add("hidden");
        timerDiv.style.display = "none";
        // adds a point to total wins
        totalWins += 1;
        // adds a point to full grid wins
        winsFullGrid += 1;
    }
}

// DICE ROLLER
diceRoller.addEventListener("click", handleRollButtonClick);
let diceOneValue;
let diceTwoValue;

function handleRollButtonClick() {
    // adjust CSS
    diceDiv.style.justifyContent = "flex-start";
    diceDiv.style.paddingLeft = "75px";

    // when the roll button is clicked, generate random numbers between 1 and 6 for each of the die
    diceOneValue = Math.floor(Math.random() * 6) + 1;
    diceTwoValue = Math.floor(Math.random() * 6) + 1;

    // set the src attribute of each dice image depending on the randomly generated number
    let diceOneSrc = `img/dice${diceOneValue}.png`;
    diceOne.setAttribute('src', diceOneSrc);
    let diceTwoSrc = `img/dice${diceTwoValue}.png`;
    diceTwo.setAttribute('src', diceTwoSrc);

    // hide the placeholders when the die are rolled
    placeholders.forEach(placeholder => placeholder.style.display = "none");

    // ensures that there are no duplicate event listeners on the cells
    cells.forEach((cell) => {
        cell.removeEventListener("click", shade);
    });

    // only AFTER the roll button is clicked, shade a cell when clicked and push that cell to the clickedCells array
    cells.forEach((cell) => {
        cell.addEventListener("click", shade);
    });
}

submitButton.addEventListener("click", handleSubmitButtonClick);

function handleSubmitButtonClick() {
    console.log("submission:");
    const product = diceOneValue * diceTwoValue;
    const clickedCellsCurrentTurn = [...clickedCells];

    console.log(`product: ${product}`)
    console.log(`length of clickedCells array: ${clickedCells.length}`);
    console.log(`length of clickedCellsCurrentTurn array: ${clickedCellsCurrentTurn.length}`);

    if (product !== clickedCellsCurrentTurn.length) {
        console.log("doesn't match");
        noMatchMessage.classList.remove("hidden");
    } else {
        console.log("match");
        clickedCells = [];
        checkIfAllShaded();
    }
}

closeButton.addEventListener("click", function () {
    noMatchMessage.classList.add("hidden"); 
});


//timer
var timer = 60;
var interval = setInterval(function() {
    timer--;
    $('.timer').text(timer);
    if (timer === 0) clearInterval(interval);
}, 1000);

function resetTimer() {
    timer=61;
};

// Leaderboard Section

// lose condition of forfeiting two consecutive turns
let forfeitTurnPoints = 0;
// let count = 0; 
// diceRoller.addEventListener("click", function () {
//     count++;
//     if (count === 2) {
//         console.log("You lose!") 
//         forfeitTurnPoints++;
//     } 
// });

// const count = 0; this should have been a global function so outside of the event lister.

// win condition of the whole grid being shaded.  Carol is working on this one I think?
let fullGridPoints = 0; // This is just a placeholder for working on the icons and the point trackers.


//  Icon section to see number of points when hovering over icon

const forfeitIcon = document.getElementById("fa-solid fa-font-awesome small-icon");  // Ask if this is the right icon to use.

forfeitIcon.addEventListener("mousemover", function () {
    forfeitIcon.innerHTML = forfeitTurnPoints.length;
}); 

const fullGridIcon = document.getElementById("fa-solid fa-square small-icon");

fullGridIcon.addEventListener("mouseover", function () {
    fullGridIcon.innerHTML = filledGridWin.length
});

const totalIcon = document.getElementById("");

totalIcon.addEventListener("mouseover", function () {
    totalIcon.innerHTML // Ask about this one.  I might have to add an array like the other point trackers.
})


// Point tracking section

const lossPointsTotal = function () {
    const losePointsTracker = document.getElementById("losePointsTracker");
    losePointsTracker.innerHTML = forfeitTurnPoints.length;
}

/*
const winPointsTotal = function () {
    const winPointsTracker = document.getElementById("winPointsTracker");
    winPointsTracker.innerHTML = fullGridPoints.length;
}
*/

const totalPoints = function () {
    const totalPointsTracker = document.getElementById("totalPointsTracker")
    totalPointsTracker.innerHTML = forfeitTurnPoints.length + fullGridPoints.length; // Not sure if this is correct.  Will have to ask.

};



// CLEAR GRID FUNCTION
function clearGrid() {
    cells.forEach((cell) => {
        cell.classList.remove("shaded");
    });
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
clearGrid();
}); 


function timesUp() {
    if (timer = 1) {
        console.log("You lose")
    }
}
timesUp();

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

