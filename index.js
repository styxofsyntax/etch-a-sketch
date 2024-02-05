const container = document.querySelector(".middle-container");
const grid_size_indicator = document.querySelector("#grid-size");
const new_button = document.querySelector("#new-button");
const clear_button = document.querySelector("#clear-button");
const mode_buttons = document.querySelectorAll(".mode-button");
const grid_border = document.createElement("div");

const MIN_SIZE = 2;
const MAX_SIZE = 100;
const BOARD_COLOR = [245, 245, 245];
let pen_color = [46, 139, 87];
let current_size = 16
let pendown = false;
let modes = ["brush", "pen", "rainbow", "eraser"];
let current_mode = "pen";

document.addEventListener("DOMContentLoaded", (event) => {
    document.querySelector(`#${current_mode}`).classList.add("selected-mode-button");
});


grid_border.className = "grid-border";
container.appendChild(grid_border);

createGrid(current_size);

new_button.addEventListener("click", () => {
    let grid_size = inputGridSize();
    if (grid_size !== null)
        createGrid(grid_size);
});

clear_button.addEventListener("click", () => {
    createGrid(current_size);
});

mode_buttons.forEach(mode_button => {
    mode_button.addEventListener("click", handleModeChange);
});

grid_border.addEventListener("mouseover", handleTileInteraction);

grid_border.addEventListener("mousedown", (event) => {
    pendown = true;
    handleTileInteraction(event);
});

document.addEventListener("mouseup", () => {
    if (pendown)
        pendown = false;
});

function createGrid(grid_size) {
    let rows = [];

    grid_size_indicator.textContent = `Grid Size: ${grid_size}`;
    current_size = grid_size;
    for (let i = 0; i < grid_size; i++) {
        const row = document.createElement("div");
        row.className = "tileRow"

        for (let j = 0; j < grid_size; j++) {
            const tile = document.createElement("div");
            tile.className = "tile";
            row.appendChild(tile);
        }

        rows.push(row);
    }

    grid_border.replaceChildren(...rows);
}

function getRGBA(tile) {
    let rgbaValue = tile.style.backgroundColor;
    if (rgbaValue.length === 0)
        return null;
    rgbaValue = rgbaValue.slice(0, - 1).replace(/^rgba?\(/, '');
    let arr = rgbaValue.split(',');

    return arr.map((x) => parseFloat(x));
}

function isSameRGB(first, second) {
    for (let i = 0; i < 3; i++) {
        if (first[i] !== second[i])
            return false;
    }
    return true;
}

function inputGridSize() {
    let input;

    do {
        input = prompt(`Enter the grid size (${MIN_SIZE}-${MAX_SIZE})`);
        if (input === null) // if cancel is pressed
            break;

        input = parseInt(input);
    } while (isNaN(input) || input < MIN_SIZE || input > MAX_SIZE);

    return input;
}

function udpateTile(tile) {
    if (current_mode === "pen") {
        tile.style.backgroundColor = `rgb(${pen_color[0]}, ${pen_color[1]}, ${pen_color[2]})`;
    }
    else if (current_mode === "eraser") {
        tile.style.backgroundColor = `rgb(${BOARD_COLOR[0]}, ${BOARD_COLOR[1]}, ${BOARD_COLOR[2]})`;
    }
    else if (current_mode === "brush") {
        let opacity = 0.2; // default opacity
        rgbaValue = getRGBA(tile);

        if (rgbaValue && isSameRGB(rgbaValue, pen_color)) {
            if (rgbaValue[3] === undefined) // opacity is 1
                return;
            else
                opacity = rgbaValue[3] + 0.1;
        }

        tile.style.backgroundColor = `rgba(${pen_color[0]}, ${pen_color[1]}, ${pen_color[2]}, ${opacity})`;
    }
    else if (current_mode === "rainbow") {
        var red = Math.floor(Math.random() * 256);
        var green = Math.floor(Math.random() * 256);
        var blue = Math.floor(Math.random() * 256);

        tile.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    }
}

function handleTileInteraction(event) {
    event.preventDefault();
    elem = event.target;
    if (elem.classList.contains("tile") && pendown)
        udpateTile(elem);
}

function handleModeChange(event) {
    event.preventDefault();
    elem = event.target;

    document.querySelector(".selected-mode-button").classList.remove("selected-mode-button");
    elem.classList.add("selected-mode-button");

    current_mode = elem.id;
}