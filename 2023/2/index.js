const fs = require('fs');
const { sum, multiply } = require('../helpers');

const MAX = {
    red: 12,
    green: 13,
    blue: 14,
}

const getGame = line => {
    const regex = /(\d+) (\w+)/g;
    let m;
    const game = {};

    while ((m = regex.exec(line)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        game[m[2]] = +m[1];
        // m.forEach((match, groupIndex) => {
        //     console.log(`Found match, group ${groupIndex}: ${match}`);
        // });
    }
    return game;
}

fs.readFile('input', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const array = data.split('\n');

    const r = array.map(line => {
        const splitted = line.split(':');
        const id = +splitted[0].replace('Game ', '');
        const games = splitted[1].split(';');
        return {
            id,
            games: games.map(g => getGame(g)),
        };
    })
    // console.log(r);
    const r2 = r.filter(game => {
        return game.games.every(game => Object.keys(game).every(color => {
            return game[color] <= MAX[color];
        }))
    }).map(game => game.id);

    // console.log(r2);
    console.log(sum(r2));
    const r3 = r.map(game => {
        const min = {
            blue: 0,
            red: 0,
            green: 0,
        };
        game.games.forEach(set => {
            Object.keys(set).forEach(color => {
                min[color] = Math.max(min[color], set[color]);
            })
        });
        return min;
    })
    const r4 = r3.map(min => multiply(Object.values(min)));
    console.log(r4);
    console.log(sum(r4))
});