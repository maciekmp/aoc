const fs = require('fs');
const { num: {
    BigNumArray
} } = require("bigarray")
const { sum, multiply } = require('../helpers');

fs.readFile('input', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const array = data.split('\r\n\r\n');
    let seeds = [];
    const maps = [];
    array.forEach((line, index) => {
        if (index === 0) {
            seeds = line.split(': ')[1].split(' ').map(s => +s);
        } else {
            maps.push(line.split('\r\n').filter(s => !s.includes(':')).map(s => s.split(' ').map(s => +s)));
        }
    });
    // console.log(seeds);
    // console.log(maps);
    const r = seeds.map(seed => {
        maps.forEach(map => {
            const range = map.find(range => {
                if (seed >= range[1] && seed <= range[1] + range[2]) {
                    // console.log('find range', seed, range)
                    return true;
                }
                return false;
            });
            if (range) {
                seed = range[0] + seed - range[1];
            }
        })
        return seed;
    })
    // console.log(r);
    console.log(Math.min(...r));

    console.log('PART 2');
    const seeds2 = new Array(seeds.length / 2).fill().map((_, index) => {
        const start = seeds[index * 2];
        const length = seeds[index * 2 + 1];
        let minLocation;
        console.log(`${index + 1}/${seeds.length / 2} length: ${length}`)
        for (let i = start; i < start + length; i++) {
            let seed = i;
            maps.forEach(map => {
                const range = map.find(range => {
                    if (seed >= range[1] && seed < range[1] + range[2]) {
                        return true;
                    }
                    return false;
                });
                if (range) {
                    seed = range[0] + seed - range[1];
                }
            });
            minLocation = minLocation ? Math.min(minLocation, seed) : seed;
        }
        return minLocation;
    });
    console.log(seeds2);
    console.log(Math.min(...seeds2));
});