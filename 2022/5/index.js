const fs = require('fs');
const { exit } = require('process');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const [stacksBlock, moves] = data.split('\n\n');
    const stacksLines = stacksBlock.split('\n').reverse().slice(1);
    const stacks = new Array(9).fill().map(() => [])
    stacksLines.forEach(line => {
        stacks.forEach((v, index) => {
            //0 1 2 3
            // *4+1
            //1 5 9 13
            const char = line[index * 4 + 1];
            if (char.trim()) {
                stacks[index].push(char);
            }
        })
    })
    const stacks2 = JSON.parse(JSON.stringify(stacks));
    moves.split('\n').forEach(line => {
        const [n, from, to] = line.replace('move ', '').replace(' from ', ' ').replace(' to ', ' ').split(' ');
        if (!n) { return }
        for (let i = 0; i < n; i++) {
            const value = stacks[from - 1].pop();
            stacks[to - 1].push(value);
        }
        const values = stacks2[from - 1].splice(-n);
        stacks2[to - 1].push(...values);
    })
    let result = '';
    stacks.forEach(stack => result += stack.slice(-1));
    let result2 = '';
    stacks2.forEach(stack => result2 += stack.slice(-1));
    console.log(1, result);
    console.log(2, result2);
});