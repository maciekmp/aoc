const fs = require('fs');
const { sum, multiply } = require('../helpers');

fs.readFile('input', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const array = data.split('\n');

    const r = array.map(line => {
    })
});