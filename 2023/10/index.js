const fs = require('fs');
const { sum, multiply } = require('../helpers');

// | is a vertical pipe connecting north and south.
// - is a horizontal pipe connecting east and west.
// L is a 90-degree bend connecting north and east.
// J is a 90-degree bend connecting north and west.
// 7 is a 90-degree bend connecting south and west.
// F is a 90-degree bend connecting south and east.
// . is ground; there is no pipe in this tile.
// S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.
const C = {
    '|': [[-1, 0], [1, 0]],
    '-': [[0, -1], [0, 1]],
    'L': [[0, 1], [-1, 0]],
    'J': [[0, -1], [-1, 0]],
    '7': [[0, -1], [1, 0]],
    'F': [[0, 1], [1, 0]],
    'S': [[0, 1]],
}
const print = (text, color = 37) => {
    process.stdout.write(`\x1b[${color}m${text}\x1b[0m`);
}

fs.readFile('input', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const array = data.split('\r\n');

    const matrix = array.map(line => {
        return line.split('');
    });
    const map = matrix.flat().map((symbol, index) => {
        if (symbol === '.') {
            return;
        }
        const row = Math.floor(index / matrix[0].length);
        const col = index % matrix[0].length;
        return {
            symbol,
            coord: [row, col],
        }
    }).filter(v => !!v);
    console.log(map);
    let current = map.find(o => o.symbol === 'S');
    let prev;
    let counter = 0;
    const path = [current];
    do {
        const { symbol, coord } = current;
        const directions = C[symbol];
        let nextCoords = directions.map(direction => [coord[0] + direction[0], coord[1] + direction[1]]);
        if (prev) {
            nextCoords = nextCoords.filter(nextCoord => {
                return nextCoord[0] !== prev.coord[0] || nextCoord[1] !== prev.coord[1];
            });
        }
        const [nextCoord] = nextCoords;
        prev = current;
        current = map.find(obj => obj.coord[0] === nextCoord[0] && obj.coord[1] === nextCoord[1]);
        path.push(current);
        counter++;
    } while (current.symbol !== 'S');
    console.log(counter / 2);
    console.log('PART 2');
    const r = matrix.map((line, row) => {
        return line
            .map((s, col) => {
                const isPath = !!path.find(obj => obj.coord[0] === row && obj.coord[1] === col);
                if (isPath) {
                    return s;
                }
                return '.';
            })
            .map((s, col, line) => {
                if (s !== '.') {
                    return s;
                }
                let firstCorner;
                const toLeft = line.slice(0, col).filter(s => {
                    if (s === '|') {
                        return true;
                    }
                    if (['L', 'J', '7', 'F'].includes(s)) {
                        // for corners need to check if pipe is going vertical
                        if (!firstCorner) { // first corner
                            firstCorner = s;
                        } else { // second corder
                            if (C[firstCorner][1][0] !== C[s][1][0]) {
                                // vertical if start and end corner have different vertical connection direction
                                firstCorner = null;
                                return true;
                            }
                            firstCorner = null;
                        }
                    }
                    return false;
                }).length;
                // return toLeft;
                if (toLeft % 2 === 0) {
                    return '.'
                }
                return 'I';
            });
    });
    r.forEach((line, row) => {
        line.forEach((s, col) => {
            const isPath = path.find(obj => obj.coord[0] === row && obj.coord[1] === col);
            const color = isPath ? 32 : 37;
            print(s, color);
        });
        console.log('');
    });
    const count = r.flat().filter(s => s === 'I').length;
    console.log(count);
});