const gridContainer = document.querySelector('.grid-container');
const rangeBtn = document.getElementById('range');

let rangeValue = 0;
let gridSystem = 16 * 16;
let isMouseDown = false;

document.addEventListener("mousedown", function() {
    isMouseDown = true;
    console.log(isMouseDown);
});

document.addEventListener("mouseup", function() {
    isMouseDown = false;
    console.log(isMouseDown);
});

function addHoverEffect() {
    const allSquares = document.querySelectorAll('.square');
    allSquares.forEach(square => {
        square.onmousedown = function() {
            square.style.backgroundColor = "#000";
        };
        square.onmouseover = function() {
            if (isMouseDown) {
                square.style.backgroundColor = "#000";
            }
        };
    });
}

function createGridBoard() {
    gridContainer.style.gridTemplateColumns = `repeat(${rangeValue}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${rangeValue}, 1fr)`;
    for (let i = 0; i < gridSystem; i++) {
        const square = document.createElement('div');
        gridContainer.appendChild(square).classList.add("square");
    }
    addHoverEffect();
}

createGridBoard();

addHoverEffect();

function clearGridBoard() {
    const allSquares = document.querySelectorAll('.square');
    allSquares.forEach(square => square.remove());
}

rangeBtn.addEventListener('change', function(value) {
    console.log("triggered", value.target.value);
    rangeValue = value.target.value;
    gridSystem = value.target.value * value.target.value;
    console.log(gridSystem);

    clearGridBoard();
    createGridBoard();
});