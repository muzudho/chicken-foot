/**
 * Dynamic style.
 * @authore muzudho
 * @module js/dynamic-style
 */

function loadDynamicStyle() {
    "use strict";
    // Montain.
    let elmMountain = document.getElementById('mountain');
    elmMountain.style.left = 400 + 'px';
    elmMountain.style.top = 40 + 'px';

    let deckBorderColor = [
        '#3C77B9',
        '#20762F',
        '#C3273D',
        '#5E2D26',
        '#204CB9',
        '#F49B3F',
        '#D8768F',
        '#89A58C'
    ];

    // Scores.
    for (let iDeck = 0; iDeck < 8; iDeck += 1) {
        let elmScore = document.getElementById('score' + iDeck);
        elmScore.style.left = 0 + 'px';
        elmScore.style.top = 40 + 'px';
        elmScore.style.width = 300 + 'px';
        elmScore.style.height = 54 + 'px';
        elmScore.style.color = deckBorderColor[iDeck];
    }

    // Decks.
    for (let iDeck = 0; iDeck < 8; iDeck += 1) {
        let elmDeck = document.getElementById('deck' + iDeck);
        elmDeck.style.left = Math.floor(Math.random() * 600 + 40) + 'px';
        elmDeck.style.top = Math.floor(Math.random() * 400 + 40) + 'px';
        elmDeck.style.width = 300 + 'px';
        elmDeck.style.height = 100 + 'px';
        elmDeck.style.borderColor = deckBorderColor[iDeck];
    }

    // Tiles.
    for (let iTile = 0; iTile < G.tileNumbers.length; iTile += 1) {
        let elmTile = document.getElementById('tile' + G.tileNumbers[iTile]);
        if (elmTile !== null) {
            // 初期位置
            elmTile.style.left = Math.floor(Math.random() * 600 + 40) + 'px';
            elmTile.style.top = Math.floor(Math.random() * 400 + 40) + 'px';
            elmTile.style.width = 32 + 'px';
            elmTile.style.height = 64 + 'px';
        }
    }

}
