/**
 * Timer pseudo thread.
 * @authore muzudho
 * @module js/timer
 */

function onInterval() {
    "use strict";
    refreshScoreByAllDecks();

    // Mats.
    for (let iPlyr = 0; iPlyr < 8; iPlyr += 1) {
        let elmDeck = document.getElementById('deck' + iPlyr);
        console.log('iPlyr=' + iPlyr + ' mat width=' + parseInt(elmDeck.style.width, 10) + ' height=' + parseInt(elmDeck.style.height, 10) + ' demoAngleDeg=' + G.demoAngleDeg[iPlyr] + ' currentAngleDeg=' + G.currentAngleDeg[iPlyr]);

        let elmScore = document.getElementById('score' + iPlyr);
        elmScore.innerHTML = G.scoreByDeck[iPlyr] + '点';

    }
}
