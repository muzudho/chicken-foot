/**
 * Dynamic style.
 * @authore muzudho
 * @module js/dynamic-style
 */

const BODY_PADDING_TOP = 5 * 40;
const IMG_DIR = "http://game.warabenture.com/chicken-foot/img/";

const DYNAMIC_STYLE_DECK_COLOR = [
    '#3C77B9',
    '#20762F',
    '#C3273D',
    '#5E2D26',
    '#204CB9',
    '#F49B3F',
    '#D8768F',
    '#89A58C',
    '#020001', // stack
    '#0080FF' // root pibot
];

function getTilePath(tileNumber) {
    IMG_DIR + tileNumber + '.png';
}

function loadDynamicStyleMove(suffix) {
    "use strict";
    let elmMove = document.getElementById('move' + suffix);
    elmMove.style.left = 0 + 'px';
    elmMove.style.top = BODY_PADDING_TOP + 'px';
    elmMove.style.width = 36 + 'px';
    elmMove.style.height = 36 + 'px';
    switch (suffix) {
    case 'S':
        elmMove.style.color = DYNAMIC_STYLE_DECK_COLOR[STACK_INDEX];
        break;
    case 'RP':
        elmMove.style.color = DYNAMIC_STYLE_DECK_COLOR[ROUTE_PIBOT_INDEX];
        break;
    default:
        elmMove.style.color = DYNAMIC_STYLE_DECK_COLOR[suffix];
    }
}

function loadDynamicStyleScore(suffix) {
    "use strict";
    let elmScore = document.getElementById('score' + suffix);
    elmScore.style.left = 0 + 'px';
    elmScore.style.top = BODY_PADDING_TOP + 'px';
    elmScore.style.width = 300 + 'px';
    elmScore.style.height = 54 + 'px';
    elmScore.style.color = DYNAMIC_STYLE_DECK_COLOR[suffix];
}

function loadDynamicStyleDeck(suffix) {
    let elmDeck = document.getElementById('deck' + suffix);
    elmDeck.style.left = Math.floor(Math.random() * 600 + BODY_PADDING_TOP) + 'px';
    elmDeck.style.top = Math.floor(Math.random() * 400 + BODY_PADDING_TOP) + 'px';
    switch (suffix) {
    case 'S':
        // stack.
        elmDeck.style.left = 400 + 'px';
        elmDeck.style.top = BODY_PADDING_TOP + 'px';
        elmDeck.style.borderColor = DYNAMIC_STYLE_DECK_COLOR[STACK_INDEX];
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
    }
}

function loadDynamicStylePlayerIcon(suffix) {
    let elmPlayerIcon = document.getElementById('playerIcon' + suffix);
    elmPlayerIcon.style.color = DYNAMIC_STYLE_DECK_COLOR[suffix];
}

function loadDynamicStyle() {
    "use strict";

    // Moves.
    for (let iDeck = 0; iDeck < 8; iDeck += 1) {
        loadDynamicStyleMove(iDeck);
    }
    loadDynamicStyleMove('S');
    loadDynamicStyleMove('RP');

    // Scores.
    for (let iDeck = 0; iDeck < 8; iDeck += 1) {
        loadDynamicStyleScore(iDeck);
    }

    // Decks.
    for (let iDeck = 0; iDeck < 8; iDeck += 1) {
        loadDynamicStyleDeck(iDeck);
    }
    loadDynamicStyleDeck('S');
    loadDynamicStyleDeck('RP');

    // Player icons.
    for (let iPlyr = 0; iPlyr < 8; iPlyr += 1) {
        loadDynamicStylePlayerIcon(iPlyr);
    }

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
