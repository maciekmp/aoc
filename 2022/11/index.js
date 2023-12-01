const fs = require('fs');
const os = require('node:os');
const { exit } = require('process');
os.setPriority(process.pid, os.constants.priority.PRIORITY_HIGHEST);

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const MONKEYS = {}
    data.split('\n\n').forEach((monkeyString, index) => {
        if (monkeyString.length === 0) {
            return;
        }
        const MONKEY = {}
        monkeyString.split('\n').forEach(line => {
            if (line.includes('  Starting items: ')) {
                MONKEY.items = line.replace('  Starting items: ', '').split(', ').map(s => +s);
            }
            if (line.includes('  Operation: new = ')) {
                MONKEY.operation = line.replace('  Operation: new = ', '');
            }
            if (line.includes('  Test: divisible by ')) {
                MONKEY.test = +line.replace('  Test: divisible by ', '');
            }
            if (line.includes('    If true: throw to monkey ')) {
                MONKEY.true = +line.replace('    If true: throw to monkey ', '');
            }
            if (line.includes('    If false: throw to monkey ')) {
                MONKEY.false = +line.replace('    If false: throw to monkey ', '');
            }
        })
        MONKEY.inspects = 0;
        MONKEYS[index] = MONKEY;
    })
    for (let i = 0; i < 20; i++) {
        Object.values(MONKEYS).forEach(monkey => {
            monkey.items.forEach(item => {
                monkey.inspects++;
                const level = eval(monkey.operation.replace('old', item).replace('old', item));
                const levelDivided = Math.floor(level / 3)
                const test = levelDivided % monkey.test === 0;
                const newMonkey = monkey[test.toString()]
                MONKEYS[newMonkey].items.push(levelDivided);
            })
            monkey.items = [];
        })
    }
    const business = Object.values(MONKEYS).map(monkey => monkey.inspects).sort((a, b) => b - a).slice(0, 2).reduce((a, b) => a * b);

    console.log(1, business);
});

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const MONKEYS = {}
    data.split('\n\n').forEach((monkeyString, index) => {
        if (monkeyString.length === 0) {
            return;
        }
        const MONKEY = {}
        monkeyString.split('\n').forEach(line => {
            if (line.includes('  Starting items: ')) {
                MONKEY.items = line.replace('  Starting items: ', '').split(', ').map(item => +item);
            }
            if (line.includes('  Operation: new = ')) {
                MONKEY.operation = line.replace('  Operation: new = ', '');
            }
            if (line.includes('  Test: divisible by ')) {
                MONKEY.test = +line.replace('  Test: divisible by ', '');
            }
            if (line.includes('    If true: throw to monkey ')) {
                MONKEY.true = +line.replace('    If true: throw to monkey ', '');
            }
            if (line.includes('    If false: throw to monkey ')) {
                MONKEY.false = +line.replace('    If false: throw to monkey ', '');
            }
        })
        MONKEY.inspects = 0;
        MONKEYS[index] = MONKEY;
    })
    const lcd = Object.values(MONKEYS).map(monkey => monkey.test).reduce((a, b) => a * b);
    for (let i = 0; i < 10000; i++) {
        Object.values(MONKEYS).forEach(monkey => {
            monkey.items.forEach(item => {
                monkey.inspects++;
                const chunks = monkey.operation.split(' ').map(chunk => chunk === 'old' ? item : chunk);
                const level = eval(chunks.join('')) % lcd;

                const test = level % monkey.test === 0
                // console.log(level, BigInt(monkey.test), level % BigInt(monkey.test), test);
                const newMonkey = monkey[test.toString()]
                MONKEYS[newMonkey].items.push(level);
            })
            monkey.items = [];
        })
    }
    const business = Object.values(MONKEYS).map(monkey => monkey.inspects).sort((a, b) => b - a).slice(0, 2).reduce((a, b) => a * b);
    console.log(MONKEYS);
    console.log(2, business);
});