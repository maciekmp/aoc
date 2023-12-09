const fs = require('fs');
const { sum, multiply } = require('../helpers');

fs.readFile('input', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const array = data.split('\r\n');

    let steps;
    const network = {};
    const r = array.map((line, index) => {
        if (line === '') {
            return;
        }
        if (index === 0) {
            steps = line.split('');
            return;
        }
        const [from, directions] = line.split(' = (');
        const [L, R] = directions.replace(')', '').split(', ');
        network[from] = {
            L,
            R,
        }
    });
    let current = 'AAA';
    let step = 0;
    while (current !== 'ZZZ') {
        current = network[current][steps[step % steps.length]];
        step++;
    }
    console.log(current, step);

    console.log('PART 2');
    let nodes = Object.keys(network).filter(key => key[2] === 'A').map(start => ({
        start,
        current: start,
        zIndex: [],
    }));
    // console.log(nodes);
    step = 0;
    do {
        nodes.forEach((node) => {
            if (node.zIndex.length === 2) {
                return;
            }
            node.current = network[node.current][steps[step % steps.length]];
            if (node.current[2] === 'Z') {
                node.zIndex.push(step + 1);
                // console.log(nodes);
            }
        });
        step++;
    } while (nodes.filter(node => node.zIndex.length > 1).length !== nodes.length);
    const r2 = nodes.map(node => ({
        ...node,
        diff: node.zIndex[1] - node.zIndex[0],
    })).map(node => node.diff);
    console.log(r2);

    function lowestCommonMultiple(list) {
        let multiple = list[0]
        for (let n = 1; n < list.length; n++) {
            multiple = lcm(multiple, list[n])
        }
        
        return multiple
    
        function lcm(a, b) { return (a * b) / gcd(a, b) }
    
        function gcd(a, b) { return (b == 0) ? a : gcd(b, a % b) }
    }
    console.log(lowestCommonMultiple(r2));
});