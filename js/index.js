/**
 * Chicken foot.
 * @module js/index
 */
/*jslint es6 */

const DECK_NUM = 8;
const MOUNTEN_INDEX = 8;
const ROUTE_PIBOT_INDEX = 9;

/** Global variables. */
G = {};

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 * {@Link https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array |2011-06-08 How can I shuffle an array?}
 */
function shuffle(a) {
    "use strict";
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function onResize() {
    "use strict";
    // root pibot
    let elmDeckRP = document.getElementById('deckRP');
    elmDeckRP.style.left = (window.innerWidth / 2 + 32) + "px";
    elmDeckRP.style.top = (window.innerHeight / 2 + 132) + "px";
}

function onInterval() {
    "use strict";

    // Decks.
    for (let iDeck = 0; iDeck < 8; iDeck += 1) {
        let elmDeck = document.getElementById('deck' + iDeck);
        G.scoreByDeck[iDeck] = 0;
        // Tiles.
        for (let iTile = 0; iTile < G.tileNumbers.length; iTile += 1) {
            let tileNum = G.tileNumbers[iTile];
            let idTile = 'tile' + tileNum;
            let elmTile = document.getElementById(idTile);
            if (isIntersect(elmTile, elmDeck)) {
                if (tileNum === 0) {
                    // ダブル ブランクの失点は 50点。
                    G.scoreByDeck[iDeck] -= 50;
                } else {
                    G.scoreByDeck[iDeck] -= tileNum;
                }
            }
        }

        let elmScore = document.getElementById('score' + iDeck);
        elmScore.innerHTML = G.scoreByDeck[iDeck] + '点';
    }
}
