/**
 * Timer pseudo thread.
 * @authore muzudho
 * @module js/timer
 */

function onInterval() {
    "use strict";
    refreshScoreByAllMats();

    // Mats.
    for (let iPlyr = 0; iPlyr < 8; iPlyr += 1) {
        let elmMat = document.getElementById('mat' + iPlyr);
        console.log('iPlyr=' + iPlyr + ' mat width=' + parseInt(elmMat.style.width, 10) + ' height=' + parseInt(elmMat.style.height, 10) + ' demoAngleDeg=' + G.demoAngleDeg[iPlyr] + ' currentAngleDeg=' + G.currentAngleDeg[iPlyr]);

        let elmScore = document.getElementById('score' + iPlyr);
        elmScore.innerHTML = G.scoreByMat[iPlyr] + '点';

    }
}
