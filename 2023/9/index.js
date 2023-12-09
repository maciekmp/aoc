const fs = require('fs');
const { sum, multiply } = require('../helpers');

fs.readFile('input', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const array = data.split('\r\n');

    const r = array.map(line => {
        const history = line.split(' ').map(v => +v);
        const pyramid = [history];
        let last = history;
        while (last.filter(v => v !== 0).length !== 0) {
            const level = [];
            for (let i = 1; i < last.length; i++) {
                level.push(last[i] - last[i - 1]);
            }
            pyramid.push(level);
            last = level;
        }
        pyramid.reverse();
        pyramid.forEach((level, index) => {
            if (index === 0) {
                level.push(0);
                return;
            }
            const prevLevel = pyramid[index - 1];
            const increment = prevLevel[prevLevel.length - 1];
            level.push(level[level.length - 1] + increment);
        })
        // return pyramid;
        const lastLevel = pyramid[pyramid.length - 1];
        const lastValue = lastLevel[lastLevel.length - 1];
        return lastValue;
    })
    console.log(r);
    console.log(sum(r));

    console.log('PART 2');

    const r2 = array.map(line => {
        const history = line.split(' ').map(v => +v);
        const pyramid = [history];
        let last = history;
        while (last.filter(v => v !== 0).length !== 0) {
            const level = [];
            for (let i = 1; i < last.length; i++) {
                level.push(last[i] - last[i - 1]);
            }
            pyramid.push(level);
            last = level;
        }
        pyramid.reverse();
        pyramid.forEach((level, index) => {
            if (index === 0) {
                level.unshift(0);
                return;
            }
            const prevLevel = pyramid[index - 1];
            const increment = prevLevel[0];
            level.unshift(level[0] - increment);
        })
        // return pyramid;
        const lastLevel = pyramid[pyramid.length - 1];
        const firstValue = lastLevel[0];
        return firstValue;
    });
    console.log(r2);
    console.log(sum(r2));
});