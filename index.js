const container = document.querySelector(".container");
const grid_border = document.createElement("div");
const MIN_SIZE = 2;
const MAX_SIZE = 100;
const DEFAULT_SIZE = 16;

grid_border.className = "grid-border";
container.appendChild(grid_border);

let grid_size = inputGridSize();

for (let i = 0; i < grid_size; i++) {
    const row = document.createElement("div");
    row.className = "tileRow"

    for (let j = 0; j < grid_size; j++) {
        const tile = document.createElement("div");
        tile.className = "tile";
        row.appendChild(tile);
    }

    grid_border.appendChild(row);
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