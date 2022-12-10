const fs = require('fs');

const move = (obj, direction) => {
    const mods = {
        R: [1, 0],
        D: [0, -1],
        L: [-1, 0],
        U: [0, 1],
    }
    const mod = mods[direction];
    return [obj[0] + mod[0], obj[1] + mod[1]];
}

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let ROPE = new Array(10).fill().map(() => [0, 0]);
    const visited1 = {};
    const visited10 = {};
    data.split('\n').forEach((line) => {
        if (line.length === 0) {
            return;
        }
        // console.log(line);
        const [direction, steps] = line.split(' ');
        for (let i = 0; i < steps; i++) {
            const oldRope = [...ROPE];
            ROPE.forEach((knot, index) => {
                if (index === 0) {
                    ROPE[0] = move(knot, direction);
                    return;
                }
                const oldPrevious = oldRope[index - 1];
                const previous = ROPE[index - 1];
                // tail adjustment
                ROPE[index] = [...ROPE[index]]
                if (Math.abs(previous[0] - knot[0]) > 1) {
                    ROPE[index][0] += previous[0] - oldPrevious[0];
                    const deltaY = previous[1] - knot[1];
                    if (deltaY) {
                        ROPE[index][1] += deltaY / Math.abs(deltaY);
                    }
                }else
                if (Math.abs(previous[1] - knot[1]) > 1) {
                    ROPE[index][1] += previous[1] - oldPrevious[1];
                    const deltaX = previous[0] - knot[0];
                    if (deltaX) {
                        ROPE[index][0] += deltaX / Math.abs(deltaX);
                    }
                }
            })
            // console.log(ROPE);
            visited1[`${ROPE[1][0]},${ROPE[1][1]}`] = true;
            visited10[`${ROPE[9][0]},${ROPE[9][1]}`] = true;
        }
    })
    console.log(1, Object.keys(visited1).length);
    console.log(2, Object.keys(visited10).length);
});