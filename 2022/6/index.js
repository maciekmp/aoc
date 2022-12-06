const fs = require('fs');
const { exit } = require('process');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const index = [...data].findIndex((v, start) => {
        const check = data.slice(start, start + 4);
        const checkArray = [...check];
        // unique check
        return checkArray.every((v, i) => checkArray.indexOf(v) === i);
    })
    const result = index + 4;
    console.log(1, result);
    const index2 = [...data].findIndex((v, start) => {
        const check = data.slice(start, start + 14);
        const checkArray = [...check];
        // unique check
        return checkArray.every((v, i) => checkArray.indexOf(v) === i);
    })
    const result2 = index2 + 14;
    console.log(2, result2);
    // console.log(2, result2);
});