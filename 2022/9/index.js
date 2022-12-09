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
    let H = [0, 0];
    let T = [0, 0];
    const visited = {};
    data.split('\n').forEach((line) => {
        if (line.length === 0) {
            return;
        }
        console.log(line);
        const [direction, steps] = line.split(' ');
        for (let i = 0; i < steps; i++) {
            H = move(H, direction);
            // tail adjustment
            if (Math.abs(H[0] - T[0]) > 1) {
                if (H[1] !== T[1]) {
                    T[1] = H[1];
                }
                T = move(T, direction);
            }
            if (Math.abs(H[1] - T[1]) > 1) {
                if (H[0] !== T[0]) {
                    T[0] = H[0];
                }
                T = move(T, direction);
            }
            visited[`${T[0]},${T[1]}`] = true;
            console.log({
                H,
                T,
            })
        }
    })
    console.log(1, Object.keys(visited).length);
});