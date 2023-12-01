const fs = require('fs');

const draw = (M, visited) => {
    const newM = M.map((row, y) => row.map((col, x) => visited.some((key) => key === `${y};${x}`) ? '.' : col));
    console.log(newM.map(row => row.join('')).join('\n'));
}

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const M = data.split('\n').map(line => line.split(''));
    const Sy = M.findIndex(line => line.includes('E'));
    const Sx = M[Sy].indexOf('E');
    const S = [Sy, Sx];
    const Ey = M.findIndex(line => line.includes('S'));
    const Ex = M[Ey].indexOf('S');
    const E = [Ey, Ex];

    const edges = {};

    M.forEach((row, rowIndex) => {
        row.forEach((letter, colIndex) => {
            const index = `${rowIndex};${colIndex}`;
            edges[index] = edges[index] || [];
            const value = letter.replace('E', 'z').charCodeAt(0);
            if (letter === 'S') {
                edges[index] = 'S';
                return;
            }
            const right = M[rowIndex]?.[colIndex + 1]?.charCodeAt(0);
            if (right && right <= value - 1) {
                edges[index].push(`${rowIndex};${colIndex + 1}`);
            }
            const left = M[rowIndex]?.[colIndex - 1]?.charCodeAt(0);
            if (left && left <= value - 1) {
                edges[index].push(`${rowIndex};${colIndex - 1}`);
            }
            const bottom = M[rowIndex + 1]?.[colIndex]?.charCodeAt(0);
            if (bottom && bottom <= value - 1) {
                edges[index].push(`${rowIndex + 1};${colIndex}`);
            }
            const top = M[rowIndex - 1]?.[colIndex]?.charCodeAt(0);
            if (top && top <= value - 1) {
                edges[index].push(`${rowIndex - 1};${colIndex}`);
            }
        })
    })
    const visited = [`${Sy};${Sx}`];
    const successPaths = [];
    // const path = (key = `${Sy};${Sx}`, history= []) => {
    //     const e = edges[key];
    //     if (e === 'E') {
    //         successPaths.push(history.length);
    //         console.log(history.length);
    //         return true;
    //     }
    //     for (let curr = 0; curr < e.length; curr++) {
    //         const checkKey = e[curr];

    //         if (!history.includes(checkKey)) {
    //             // visited.push(checkKey);
    //             path(checkKey, [...history, key])
    //         }
    //     }
    //     return false;
    // }
    // path()
    let timeout = false;
    const bfs = () => {
        const queue = [...visited];
        while (!!queue.length) {
            const key = queue.shift();
            const e = edges[key];
            if (e === 'S') {
                // console.clear();
                draw(M, visited);
                return true;
            }
            e.forEach(key => {
                if (!visited.includes(key)) {
                    visited.push(key);
                    queue.push(key);
                }
            })
            
            draw(M, visited);
            // if (!timeout) {
            //     // console.clear();
            //     draw(M, visited);
            //     timeout = true;
            //     setTimeout(() => {
            //         timeout = false;
            //     }, 1);
            // }
        }
    }
    bfs();
    // console.log(successPaths);

});
