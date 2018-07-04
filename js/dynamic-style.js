/**
 * Dynamic style.
 * @authore muzudho
 * @module js/dynamic-style
*/

const BODY_PADDING_TOP = 80;

const DYNAMIC_STYLE_DECK_COLOR = [
    '#3C77B9',
    '#20762F',
    '#C3273D',
    '#5E2D26',
    '#204CB9',
    '#F49B3F',
    '#D8768F',
    '#89A58C',
    '#020001', // mountain
    '#0080FF' // root pibot
];

function loadDynamicStyleMove(suffix) {
    let elmMove = document.getElementById('move' + suffix);
    elmMove.style.left = 0 + 'px';
    elmMove.style.top = BODY_PADDING_TOP + 'px';
    elmMove.style.width = 36 + 'px';
    elmMove.style.height = 36 + 'px';
    switch (suffix) {
    case 'M':
        elmMove.style.color = DYNAMIC_STYLE_DECK_COLOR[MOUNTEN_INDEX];
        break;
    case 'RP':
        elmMove.style.color = DYNAMIC_STYLE_DECK_COLOR[ROUTE_PIBOT_INDEX];
        break;
    default:
        elmMove.style.color = DYNAMIC_STYLE_DECK_COLOR[suffix];
        break;
    }
}

function loadDynamicStyleScore(suffix) {
    "use strict";
    let elmScore = document.getElementById('score' + suffix);
    elmScore.style.left = 0 + 'px';
    elmScore.style.top = BODY_PADDING_TOP + 'px';
    elmScore.style.width = 300 + 'px';
    elmScore.style.height = 54 + 'px';
    switch (suffix) {
    case 'M':
        elmScore.style.color = DYNAMIC_STYLE_DECK_COLOR[MOUNTEN_INDEX];
        break;
    case 'RP':
        elmScore.style.color = DYNAMIC_STYLE_DECK_COLOR[ROUTE_PIBOT_INDEX];
        break;
    default:
        elmScore.style.color = DYNAMIC_STYLE_DECK_COLOR[suffix];
        break;
    }
}

function loadDynamicStyleDeck(suffix) {
    let elmDeck = document.getElementById('deck' + suffix);
    elmDeck.style.left = Math.floor(Math.random() * 600 + BODY_PADDING_TOP) + 'px';
    elmDeck.style.top = Math.floor(Math.random() * 400 + BODY_PADDING_TOP) + 'px';
    switch (suffix) {
    case 'M':
        // mountain.
        elmDeck.style.left = 400 + 'px';
        elmDeck.style.top = BODY_PADDING_TOP + 'px';
        elmDeck.style.borderColor = DYNAMIC_STYLE_DECK_COLOR[MOUNTEN_INDEX];
        break;
    case 'RP':
        // root pibot.
        elmDeck.style.left = (window.innerWidth / 2 + 32) + 'px';
        elmDeck.style.top = (window.innerHeight / 2 + 132) + 'px';
        elmDeck.style.borderColor = DYNAMIC_STYLE_DECK_COLOR[ROUTE_PIBOT_INDEX];
        break;
    default:
        elmDeck.style.width = 300 + 'px';
        elmDeck.style.height = 100 + 'px';
        elmDeck.style.borderColor = DYNAMIC_STYLE_DECK_COLOR[suffix];
        break;
    }
}

function loadDynamicStyle() {
    "use strict";

    // Moves.
    for (let iDeck = 0; iDeck < 8; iDeck += 1) {
        loadDynamicStyleMove(iDeck);
    }
    loadDynamicStyleMove('M');
    loadDynamicStyleMove('RP');

    // Scores.
    for (let iDeck = 0; iDeck < 8; iDeck += 1) {
        loadDynamicStyleScore(iDeck);
    }
    loadDynamicStyleScore('M');
    loadDynamicStyleScore('RP');

    // Decks.
    for (let iDeck = 0; iDeck < 8; iDeck += 1) {
        loadDynamicStyleDeck(iDeck);
    }
    loadDynamicStyleDeck('M');
    loadDynamicStyleDeck('RP');

    // Tiles.
    for (let iTile = 0; iTile < G.tileNumbers.length; iTile += 1) {
        let elmTile = document.getElementById('tile' + G.tileNumbers[iTile]);
        //if (elmTile !== null) {
        // 初期位置
        elmTile.style.left = Math.floor(Math.random() * 600 + BODY_PADDING_TOP) + 'px';
        elmTile.style.top = Math.floor(Math.random() * 400 + BODY_PADDING_TOP) + 'px';
        elmTile.style.width = 32 + 'px';
        elmTile.style.height = 64 + 'px';
        //}
    }

}
