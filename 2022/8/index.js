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
            const left = matrix[i].slice(0, j);
            if (tree > Math.max(...left)) {
                visibleInside++;
                continue;
            }
            const right = matrix[i].slice(j + 1);
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
    const scores = [];
    for (let i = 1; i < height - 1; i++) {
        for (let j = 1; j < width - 1; j++) {
            const tree = matrix[i][j];
            const left = matrix[i].slice(0, j).reverse();
            const leftI = left.findIndex(t => t >= tree);
            const leftD = leftI > -1 ? leftI + 1 : left.length;

            const right = matrix[i].slice(j + 1);
            const rightI = right.findIndex(t => t >= tree);
            const rightD = rightI > -1 ? rightI + 1 : right.length;

            const top = matrix.slice(0, i).map(line => line[j]).reverse();
            const topI = top.findIndex(t => t >= tree);
            const topD = topI > -1 ? topI + 1 : top.length;

            const bottom = matrix.slice(i + 1).map(line => line[j]);
            const bottomI = bottom.findIndex(t => t >= tree);
            const bottomD = bottomI > -1 ? bottomI + 1 : bottom.length;
            // console.log(i,j);
            // console.log(leftD, rightD, topD, bottomD);
            scores.push(leftD * rightD * topD * bottomD)
        }
    }
    console.log(2, Math.max(...scores));
});