const fs = require('fs');
const { sum } = require('../helpers');

const MAX_SIZE = 100000; // 100 000

const TREE = {};
let pathArray = [];

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    data.split('\n').forEach((line) => {
        if (line.length === 0) {
            return;
        }
        if (line.includes('$ cd ')) {
            const name = line.split(' ')[2];
            if (name === '/') {
                pathArray = ['']
                return;
            }
            if (name === '..') {
                pathArray.pop();
                return;
            }
            pathArray.push(name);
            return;
        }
        if (line.includes('$ ls')) {
            return;
        }
        if (line.includes('dir ')) {
            return;
        }
        const path = pathArray.join('/');
        const size = line.split(' ')[0];
        // add to parents
        pathArray.forEach((v, index) => {
            const parentArray = pathArray.slice(0, index + 1);
            const parent = parentArray.join('/');
            if (typeof TREE[parent] === 'undefined') {
                TREE[parent] = 0;
            }
            TREE[parent] += +size;
        })
    })
    const filtered = Object.values(TREE).filter(size => size <= MAX_SIZE);
    console.log(1, sum(filtered));
    const freeNow = 70000000 - TREE[''];
    const freeNeed = 30000000 - freeNow;
    const sizeToRemove = Object.values(TREE).sort((a, b) => a - b).find(size => size >= freeNeed)
    console.log(2, sizeToRemove);
});