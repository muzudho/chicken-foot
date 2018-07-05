/**
 * Game rule helper.
 * @authore muzudho
 * @module js/rule-helper
 */

function refreshScoreByAllDecks() {
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
    }
}
