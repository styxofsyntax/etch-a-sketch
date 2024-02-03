const container = document.querySelector(".container");
const grid_size_indicator = document.querySelector("#grid-size");
const new_button = document.querySelector("#new-button");
const clear_button = document.querySelector("#clear-button");
const grid_border = document.createElement("div");

const MIN_SIZE = 2;
const MAX_SIZE = 100;
let current_size = 16
let pendown = false;

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

function colorTile(tile) {
    if (!tile.classList.contains("tile-colored"))
        tile.classList.add("tile-colored");
}

function handleTileInteraction(event) {
    event.preventDefault();
    elem = event.target;
    if (elem.classList.contains("tile") && pendown)
        colorTile(elem);
}