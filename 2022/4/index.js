const fs = require('fs');


const sum = arr => arr.reduce((prev, cur) => prev + cur);

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const array = data.split('\n');
    const values = array.map(line => {
        if (line.length === 0) {
            return 0;
        }
        const parts = line.split(',')
        const left = parts[0].split('-');
        const right = parts[1].split('-');
        // right inside of left
        if (+right[0] >= +left[0] && +right[1] <= +left[1]) {
            return 1;
        }
        // left inside of right
        if (+left[0] >= +right[0] && +left[1] <= +right[1]) {
            return 1;
        }
        return 0;
    })
    console.log(1, sum(values));
    const values2 = array.map(line => {
        if (line.length === 0) {
            return 0;
        }
        const parts = line.split(',')
        const left = parts[0].split('-');
        const right = parts[1].split('-');
        if (+right[0] <= +left[1] && +right[0] >= +left[0]) {
            return 1;
        }
        if (+right[1] <= +left[1] && +right[1] >= +left[0]) {
            return 1;
        }
        return 0;
    })
    console.log(2, sum(values2));
});