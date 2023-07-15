const gridContainer = document.querySelector('.grid-container');
const rangeBtn = document.getElementById('range');
const rainbowBtn = document.getElementById('rainbowBtn');
const darkeningBtn = document.getElementById('darkeningBtn');
const defaultBtn = document.getElementById('defaultBtn');
const brighteningBtn = document.getElementById('brighteningBtn');
const defaultColorPicker = document.getElementById('defaultColorPicker');
const canvasColorPicker = document.getElementById('canvasColorPicker');
const squareElements = document.querySelectorAll('.square');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');
const style = document.querySelector('style');

let rangeValue = 0;
let gridSystem = 16 * 16;
let isMouseDown = false;
let defaultColor = "#4F4F4F";
let canvasColor = "#f5f5f5"
let currentRandomColor = "";
let hoverMode = "default";

clearBtn.addEventListener("click", function() {
    clearGridBoard();
    createGridBoard();
});

eraserBtn.addEventListener("click", function() {
    hoverMode = "eraser";
});

canvasColorPicker.addEventListener("change", function() {
    canvasColor = canvasColorPicker.value;
    style.innerHTML = `.square { background-color: ${canvasColor}; }`;
});

defaultColorPicker.addEventListener("change", function() {
    defaultColor = defaultColorPicker.value;
});

brighteningBtn.addEventListener("click", function() {
    hoverMode = "brightening";
});

rainbowBtn.addEventListener("click", function() {
    hoverMode = "rainbow";
});

darkeningBtn.addEventListener("click", function() {
    hoverMode = "darkening";
});

defaultBtn.addEventListener("click", function() {
    hoverMode = "default";
});

document.addEventListener("mousedown", function() {
    isMouseDown = true;
});

document.addEventListener("mouseup", function() {
    isMouseDown = false;
});

function randomizer() {
    return Math.floor(Math.random() * 256);
};

function addRandomColor() {
    let red = randomizer();
    let green = randomizer();
    let blue = randomizer();

    return currentRandomColor = `rgb(${red}, ${green}, ${blue})`;
};

function addHoverEffect() {
    const allSquares = document.querySelectorAll('.square');
    allSquares.forEach(square => {
        square.onmousedown = function() {
            if (hoverMode === "default") {
                square.style.backgroundColor = defaultColor;
            };

            if (hoverMode === "rainbow") {
                addRandomColor();
                square.style.backgroundColor = currentRandomColor;
            };

            if (hoverMode === "darkening") {
                const currentFilterValue = window.getComputedStyle(square, null).getPropertyValue("filter");
                let currentShade = parseFloat(currentFilterValue.replace("brightness(", "").replace(")", ""));

                if (currentFilterValue === "none") {
                    square.style.filter = `brightness(.9)`;
                };

                square.style.filter = `brightness(${currentShade -= .1})`;
            };

            if (hoverMode === "brightening") {
                const currentFilterValue = window.getComputedStyle(square, null).getPropertyValue("filter");
                let currentShade = parseFloat(currentFilterValue.replace("brightness(", "").replace(")", ""));

                if (currentFilterValue === "none") {
                    square.style.filter = `brightness(1.1)`;
                };

                square.style.filter = `brightness(${currentShade += .1})`;
            };

            if (hoverMode === "eraser") {
                square.style.backgroundColor = "";
            };
        };
        
        square.onmouseover = function() {
            if (isMouseDown) {
                if (hoverMode === "default") {
                    square.style.backgroundColor = defaultColor;
                };
    
                if (hoverMode === "rainbow") {
                    addRandomColor();
                    square.style.backgroundColor = currentRandomColor;
                };
    
                if (hoverMode === "darkening") {
                    const currentFilterValue = window.getComputedStyle(square, null).getPropertyValue("filter");
                    let currentShade = parseFloat(currentFilterValue.replace("brightness(", "").replace(")", ""));
    
                    if (currentFilterValue === "none") {
                        square.style.filter = `brightness(.9)`;
                    };
    
                    square.style.filter = `brightness(${currentShade -= .1})`;
                };

                if (hoverMode === "brightening") {
                    const currentFilterValue = window.getComputedStyle(square, null).getPropertyValue("filter");
                    let currentShade = parseFloat(currentFilterValue.replace("brightness(", "").replace(")", ""));
    
                    if (currentFilterValue === "none") {
                        square.style.filter = `brightness(1.1)`;
                    };
    
                    square.style.filter = `brightness(${currentShade += .1})`;
                };

                if (hoverMode === "eraser") {
                    square.style.backgroundColor = "";
                };
            };
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

function clearGridBoard() {
    const allSquares = document.querySelectorAll('.square');
    allSquares.forEach(square => square.remove());
}

rangeBtn.addEventListener('change', function(value) {
    rangeValue = value.target.value;
    gridSystem = value.target.value * value.target.value;

    clearGridBoard();
    createGridBoard();
});