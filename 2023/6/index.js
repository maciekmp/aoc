const fs = require('fs');
const { sum, multiply } = require('../helpers');

const regex = /  (\d+)/gm;

const getDistance = (hold, total) => {
    if (hold === 0 || hold === total) {
        return 0;
    }
    return (total - hold) * hold;
}

fs.readFile('input', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const array = data.split('\n');
    const time = [];
    const distance = [];
    array.map((line, lineIndex) => {
        while ((m = regex.exec(line)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            if (lineIndex === 0) {
                time.push(+m[1]);
            }
            if (lineIndex === 1) {
                distance.push(+m[1]);
            }
        }
    });
    const r = time.map((time, raceIndex) => {
        let solutions = 0;
        for (let i = 1; i < time; i++) {
            if (getDistance(i, time) > distance[raceIndex]) {
                solutions++;
            }
        }
        return solutions;
    });
    console.log(r);
    console.log(multiply(r));

    console.log('PART 2');
    const time2 = +time.join('');
    const distance2 = +distance.join('');

    let solutions = 0;
    for (let i = 1; i < time2; i++) {
        if (getDistance(i, time2) > distance2) {
            solutions++;
        }
    }
    console.log(solutions);

});