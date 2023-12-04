const fs = require('fs');
const { sum, multiply } = require('../helpers');

const isSymbol = char => {
    if (typeof char === 'undefined') {
        return false;
    }
    if (char === '.') {
        return false;
    }
    if (Number.isInteger(+char)) {
        return false;
    }
    return true;
}
const getAround = (col, row) => {
    return [
        [col - 1, row - 1],
        [col, row - 1],
        [col + 1, row - 1],
        [col - 1, row],
        [col + 1, row],
        [col - 1, row + 1],
        [col, row + 1],
        [col + 1, row + 1],
    ]
}
const print = (text, color = 33) => {
    process.stdout.write(`\x1b[${color}m${text}\x1b[0m`);
}

fs.readFile('input', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const array = data.split('\n');

    const numbers = [];
    const numberCoords = [];
    const matrix = array.map(line => line.split(''));
    const r = array.map((line, row) => {
        const chars = line.split('');
        let number = '';
        let verified = false;
        let tempCoords = [];
        chars.forEach((char, col) => {
            if (Number.isInteger(+char)) {
                // console.log(char);
                number += char;
                tempCoords.push([col, row]);
                const around = getAround(col, row);
                around.forEach(([col, row]) => {
                    if (isSymbol(matrix[row]?.[col])) {
                        verified = true;
                    }
                })
            } else {
                if (number !== '' && verified) {
                    numbers.push(+number);
                    numberCoords.push(...tempCoords);
                }
                number = '';
                verified = false;
                tempCoords = [];
            }
        })
        //end of line
        if (number !== '' && verified) {
            numbers.push(+number);
            numberCoords.push(...tempCoords);
        }
    })
    // console.log(numbers);
    console.log(sum(numbers));
    matrix.forEach((line, row) => {
        line.forEach((char, col) => {
            if (isSymbol(char)) {
                print(char, 105)
            } else if (char === '.') {
                print(char, 97);
            } else {
                if (numberCoords.find(coords => JSON.stringify(coords) === JSON.stringify([col, row]))) {
                    print(char, 42);
                } else {
                    print(char, 41);
                }
            }
        })
        console.log();
    });
    console.log('PART 2');
    const numbersObjs = [];
    const template = {
        string: '',
        coords: [],
    };
    let tempObj = JSON.parse(JSON.stringify(template));
    const gearCoords = [];
    matrix.forEach((line, row) => {
        line.forEach((char, col) => {
            if (Number.isInteger(+char)) {
                tempObj.string += char;
                tempObj.coords.push([col, row]);
            } else {
                if (tempObj.string !== '') {
                    numbersObjs.push(tempObj);
                    tempObj = JSON.parse(JSON.stringify(template));
                }
            }
            // gears
            if(char === '*'){
                gearCoords.push([col, row]);
            }
        });
        if (tempObj.string !== '') {
            numbersObjs.push(tempObj);
            tempObj = JSON.parse(JSON.stringify(template));
        }
    });
    console.log(gearCoords.length);
    const p2 = gearCoords.map(([col, row]) => {
        console.log(col, row)
        const parts = getAround(col, row)
        .map(([col, row]) => numbersObjs.filter(obj => {
            return obj.coords.some(([numberCol, numberRow]) => numberCol === col && numberRow === row);
        }));
        return new Set(parts.flat());
    }).filter(objSet => objSet.size === 2)
    .map(([first, second]) => +first.string * +second.string);
    // console.log(gearCoords);
    console.log(p2);
    console.log(sum(p2));
});