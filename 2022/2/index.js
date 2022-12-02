const fs = require('fs');

const translate = {
    A: 'rock',
    B: 'paper',
    C: 'scisors',
    X: 'rock',
    Y: 'paper',
    Z: 'scisors',
}
const points = {
    rock: 1,
    paper: 2,
    scisors: 3,
}

fs.readFile('input', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const array = data.split('\n');
    const arrayArray = array.map(s => s.split(' '));
    const pointsArray = arrayArray.map(([one, two]) => {
        const oneT = translate[one];
        const twoT = translate[two];
        const signPoint = points[twoT];
        if(oneT === twoT){
            return 3 +signPoint;
        }
        if(oneT === 'rock' && twoT === 'paper') {
            return 6 + signPoint;
        }
        if(oneT === 'paper' && twoT === 'scisors'){
            
            return 6 + signPoint;
        }
        if(oneT === 'scisors' && twoT === 'rock'){
            
            return 6 + signPoint;
        }
        return signPoint;
    })
    const sum = pointsArray.reduce((prev, curr) => prev + curr, 0);
    console.log(1, sum);
    const pointsArray2 = arrayArray.map(([one, two]) => {
        const oneT = translate[one];
        if(oneT === 'rock'){
            if(two === 'X') {
                return 0 + 3;// loose, scisors
            }
            if(two === 'Y') {
                return 3 + 1; // draw, rock
            }
            if(two ==='Z') {
                return 6 + 2; // win, paper
            }
        }
        if(oneT === 'paper'){
            if(two === 'X') {
                return 0 + 1;// loose, rock
            }
            if(two === 'Y') {
                return 3 + 2; // draw, paper
            }
            if(two ==='Z') {
                return 6 + 3; // win, scisors
            }
        }
        if(oneT === 'scisors'){
            if(two === 'X') {
                return 0 + 2;// loose, paper
            }
            if(two === 'Y') {
                return 3 + 3; // draw, scisors
            }
            if(two ==='Z') {
                return 6 + 1; // win, rock
            }
        }
    })
    const sum2 = pointsArray2.reduce((prev, curr) => prev + curr, 0);
    console.log(2, sum2);
});