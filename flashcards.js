const readline = require('readline-sync');
const fs = require('fs');
const path = require('path');

const argv = process.argv;

const cardsFilePath = argv[2];

const cardsStr = fs.readFileSync(path.join(process.cwd(), cardsFilePath), { 'encoding': 'utf-8' });

const cardsRaw = JSON.parse(cardsStr);

const parseRawCardsObj = (cardsObj) => {
    if(Array.isArray(cardsObj)) {
        return cardsObj;
    } else {
        return Object.entries(cardsObj).map(entry => ({front: entry[0], back: entry[1]}))
    }
}

const cards = parseRawCardsObj(cardsRaw);

const shown = [];

const randomIndex = (arr) => {
    return Math.floor(Math.random() * (arr.length - 1));
}

const showCards = (cards) => {
    let exit = false;
    while(cards.length && !exit) {
        const i = randomIndex(cards);
        const card = cards.splice(i, 1)[0];
        console.log('Front: ', card.front);
        let key = readline.keyIn('', { mask: '', hideEchoBack: true});
        if(key === 'q') {
            console
            exit = true;
            continue;
        }
        console.log('Back: ', card.back);
        key = readline.keyIn('', { mask: '', hideEchoBack: true });
        if(key === 'q') {
            exit = true;
            continue;
        }
        console.log('');
    }
}

showCards(cards);


