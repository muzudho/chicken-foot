/**
 * Timer pseudo thread.
 * @authore muzudho
 * @module js/timer
 */

function onInterval() {
    "use strict";
    refreshScoreByAllMats();

    let elmRP = document.getElementById('matRP');
    let rpCenter = getMatCenter('RP');

    // Mats.
    for (let iPlyr = 0; iPlyr < PLYR_MAX_LEN; iPlyr += 1) {

        // Angle.
        let elmMat = document.getElementById('mat' + iPlyr);
        let matCenter = getMatCenter(iPlyr);
        G.matTheta[iPlyr] = Math.atan2(matCenter.x - rpCenter.x, matCenter.y - rpCenter.y);

        // Score.
        let elmScore = document.getElementById('score' + iPlyr);
        elmScore.innerHTML = G.scoreByMat[iPlyr] + '点';
    }
}
