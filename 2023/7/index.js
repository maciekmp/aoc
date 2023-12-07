const fs = require('fs');
const { sum, multiply } = require('../helpers');

const SYMBOLS = "A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, 2".split(', ');

const getType = (cards) => {
    const uniqe = new Set(cards);
    const counter = {};
    uniqe.forEach(symbol => {
        counter[symbol] = cards.filter(s => s === symbol).length;
    });
    const values = Object.values(counter).sort().reverse().slice(0, 2);
    return values;
}
const getDiff = (cardsA, cardsB) => {
    const index = cardsA.findIndex((a, index) => a !== cardsB[index]);
    return SYMBOLS.indexOf(cardsA[index]) - SYMBOLS.indexOf(cardsB[index]);
}

fs.readFile('input', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const array = data.split('\r\n');

    const r = array.map(line => {
        const [cards, bid] = line.split(' ');
        return {
            cards: cards.split(''),
            bid: +bid,
        }
    });
    r.sort((a, b) => {
        const typeA = getType(a.cards).join();
        const typeB = getType(b.cards).join();

        if (typeA === typeB) {
            return -getDiff(a.cards, b.cards);
        }
        return typeA < typeB ? -1 : 1;
    })
    // console.log(r);
    const scores = r.map((hand, index) => hand.bid * (index + 1));
    console.log(sum(scores));

    console.log('PART 2');
    const SYMBOLS2 = "A, K, Q, T, 9, 8, 7, 6, 5, 4, 3, 2, J".split(', ');
    const r2 = array.map(line => {
        const [cards, bid] = line.split(' ');
        return {
            cards: cards.split(''),
            bid: +bid,
        }
    });
    const getType2 = (cards) => {
        const uniqe = new Set(cards);
        const counter = {};
        uniqe.forEach(symbol => {
            counter[symbol] = cards.filter(s => s === symbol).length;
        });
        const entries = Object.entries(counter).sort((entryA, entryB) => entryA[1] - entryB[1]);
        if (counter['J']) {
            if (counter['J'] === 5) {
                counter['A'] = 5;
            } else {
                const firstSymbolNotJ = entries.reverse().find(entry => entry[0] !== 'J')[0];
                counter[firstSymbolNotJ] += counter['J'];
            }
            counter['J'] = 0;
        }
        return Object.values(counter).sort().reverse().slice(0, 2);
    }

    const getDiff2 = (cardsA, cardsB) => {
        const index = cardsA.findIndex((a, index) => a !== cardsB[index]);
        return SYMBOLS2.indexOf(cardsA[index]) - SYMBOLS2.indexOf(cardsB[index]);
    }
    r2.sort((a, b) => {
        const typeA = getType2(a.cards).join();
        const typeB = getType2(b.cards).join();

        if (typeA === typeB) {
            return -getDiff2(a.cards, b.cards);
        }
        return typeA < typeB ? -1 : 1;
    })
    const r3 = r2.map(hand => [hand.cards.join(''), getType2(hand.cards), hand.cards.filter(s => s === 'J').length])
    // r3.forEach(v => console.log(v))
    const scores2 = r2.map((hand, index) => hand.bid * (index + 1));
    console.log(sum(scores2));
});