const fs = require('fs');
const { sum } = require('../helpers');

const NUMBERS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

fs.readFile('input', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const array = data.split('\n');
    // start
    const r = array.map(line => {
        const numbers = line.split('').map(char => parseInt(char)).filter(char => Number.isInteger(char));
        return parseInt(`${numbers[0]}${numbers[numbers.length - 1]}`);
    });
    const r2 = sum(r);
    console.log(r2);

    // start
    const r3 = array.map(line => {
        let newLine = line;
        for(let i = 0; i < 100; i++) {
            line = newLine
            NUMBERS.forEach((string, number) => {
                const pos = line.indexOf(string);
                if (pos > -1) {
                    const chars = newLine.split('');
                    chars[pos] = number;
                    // console.log(number);
                    newLine = chars.join('');
                }
            })
        }
        const numbers = newLine.split('').map(char => parseInt(char)).filter(char => Number.isInteger(char));
        // console.log(line, newLine, parseInt(`${numbers[0]}${numbers[numbers.length - 1]}`));
        return parseInt(`${numbers[0]}${numbers[numbers.length - 1]}`);
    });
    const r4 = sum(r3);
    console.log(r4);
});