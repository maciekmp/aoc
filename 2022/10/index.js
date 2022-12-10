const fs = require('fs');

const TEST = [20, 60, 100, 140, 180, 220];
const CYCLES = {
    noop: 1,
    addx: 2,
}
const STRENGTH = {};

function spliceIntoChunks(arr, chunkSize) {
    const res = [];
    while (arr.length > 0) {
        const chunk = arr.splice(0, chunkSize);
        res.push(chunk);
    }
    return res;
}

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let cycle = 0;
    let X = 1;
    const CRT = []
    data.split('\n').forEach((line) => {
        if (line.length === 0) {
            return;
        }
        const [operation, value] = line.split(' ');

        for (let i = 0; i < CYCLES[operation]; i++) {
            cycle++;
            const pos = cycle % 40;
            const lit = pos >= X  && pos <= X + 2
            CRT.push(lit ? '#' : '.');
            if (TEST.includes(cycle)) {
                STRENGTH[cycle] = cycle * X;
            }
        }
        if (operation === 'addx') {
            X += +value;
        }
    })
    console.log(1, {
        cycle,
        X,
        STRENGTH,
        answer: Object.values(STRENGTH).reduce((prev, curr) => prev + curr)
    });
    console.log(spliceIntoChunks(CRT, 40).map(line => line.join('')).join('\n'));
});