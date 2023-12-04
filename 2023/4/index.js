const fs = require('fs');
const { sum, multiply } = require('../helpers');

fs.readFile('input', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const array = data.split('\r\n');

    const wins = [];

    const r = array.map((line, index) => {
        const [meta, data] = line.split(': ');
        const [winning, numbers] = data.split(' | ');
        const wNumbers = winning.split(' ').filter(n => n);
        const nNumbers = numbers.split(' ').filter(n => n.trim());
        // console.log(nNumbers);
        const matches = nNumbers.filter(n => wNumbers.includes(n)).length;
        wins[index] = matches;
        if (matches) {
            return Math.pow(2, matches - 1);
        }
        return 0;
    });
    console.log(r);
    console.log(sum(r))
    console.log('PART 2');
    const cardsCounter = new Array(array.length).fill(1);
    // console.log(cardsCounter);
    array.forEach((_, index) => {
        const win = wins[index];
        const ids = new Array(win).fill().map((_, i) => index + i + 1);
        ids.forEach(id => {
            cardsCounter[id] += 1 * cardsCounter[index];
        })
        // console.log(index);
    });
    console.log(sum(cardsCounter));
});