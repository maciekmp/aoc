const fs = require('fs');

fs.readFile('input', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const array = data.split('\n\n');
    const elvesArrays = array.map(s => s.split('\n'));
    const elvesValues = elvesArrays.map(array => array.reduce((prev, curr) => +prev + (+curr), 0));
    const max = Math.max(...elvesValues);
    console.log(1, max);
    const elvesSorted = elvesValues.sort((a,b) => a-b).reverse();
    const sumOfThreee = elvesSorted[0] + elvesSorted[1] + elvesSorted[2];
    console.log(2, sumOfThreee);
});