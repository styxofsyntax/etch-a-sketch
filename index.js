const container = document.querySelector(".container");
const grid_size_indicator = document.querySelector("#grid-size");
const reset_button = document.querySelector("#reset-button");
const grid_border = document.createElement("div");

const MIN_SIZE = 2;
const MAX_SIZE = 100;
const DEFAULT_SIZE = 16;


grid_border.className = "grid-border";
container.appendChild(grid_border);

createGrid(DEFAULT_SIZE);

reset_button.addEventListener("click", () => {
    let grid_size = inputGridSize();
    createGrid(grid_size);
});

function createGrid(grid_size) {
    let rows = [];

    grid_size_indicator.textContent = `Grid Size: ${grid_size}`;
    for (let i = 0; i < grid_size; i++) {
        const row = document.createElement("div");
        row.className = "tileRow"

        for (let j = 0; j < grid_size; j++) {
            const tile = document.createElement("div");
            tile.className = "tile";
            tile.addEventListener("mouseenter", colorTile);
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
            return DEFAULT_SIZE;

        input = parseInt(input);
    } while (isNaN(input) || input < MIN_SIZE || input > MAX_SIZE);

    return input;
}

function colorTile(event) {
    const tile = event.target;
    if (!tile.classList.contains("tile-colored"))
        tile.classList.add("tile-colored");
}