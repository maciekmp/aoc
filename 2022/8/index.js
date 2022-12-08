const fs = require('fs');
const { exit } = require('process');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const linesArray = data.split('\n').filter(line => line.length);
    const matrix = linesArray.map(line => line.split('').map(h => +h));
    const height = matrix.length;
    const width = matrix[0].length;
    const edges = width + width + height + height - 4;
    let visibleInside = 0;
    for (let i = 1; i < height - 1; i++) {
        for (let j = 1; j < width - 1; j++) {
            const tree = matrix[i][j];
            const left = matrix[i].slice(0, i);
            if (tree > Math.max(...left)) {
                visibleInside++;
                continue;
            }
            const right = matrix[i].slice(i + 1);
            if (tree > Math.max(...right)) {
                visibleInside++;
                continue;
            }
            const top = matrix.slice(0, i).map(line => line[j]);
            if (tree > Math.max(...top)) {
                visibleInside++;
                continue;
            }
            const bottom = matrix.slice(i + 1).map(line => line[j]);
            if (tree > Math.max(...bottom)) {
                visibleInside++;
                continue;
            }
        }
    }
    console.log(1, visibleInside + edges);
});