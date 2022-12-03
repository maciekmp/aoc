const fs = require('fs');


const sum = arr => arr.reduce((prev, cur) => prev + cur);

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const array = data.split('\n');
    const values = array.map(line => {
        if(line.length === 0) {
            return 0;
        }
        const length = line.length / 2;
        const left = line.slice(0, length);
        const right = line.slice(length);
        const letter = [...left].find(A => [...right].includes(A));
        let p = letter.charCodeAt(0) - 96;
        if (p < 0) {
            p += 58;
        }
        return p;
    })
    console.log(1, sum(values));
    const groups = [];
    array.forEach((line, index) => {
        const groupIndex = Math.floor(index/3);
        if(line.length === 0) {
            return;
        }
        if(!groups[groupIndex]){
            groups[groupIndex] = [];
        }
        groups[groupIndex].push(line);
    });
    const values2 = groups.map(([first, second, third]) => {
        const letter = [...first].filter(l => [...second].includes(l) && [...third].includes(l))[0];
        let p = letter.charCodeAt(0) - 96;
        if (p < 0) {
            p += 58;
        }
        return p;
    })
    console.log(2, sum(values2));
});
//GbccTtTSGGbgrcWBGGrdgTnVQnCmNpCJlNnNPVfClcnN