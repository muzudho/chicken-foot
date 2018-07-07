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
        if (iPlyr < G.entryPlayerNum) {
            // Angle.
            let elmMat = document.getElementById('mat' + iPlyr);
            let matCenter = getMatCenter(iPlyr);
            G.matThetaArr[iPlyr] = Math.atan2(matCenter.x - rpCenter.x, matCenter.y - rpCenter.y);

            // Score.
            let elmScore = document.getElementById('score' + iPlyr);
            elmScore.innerHTML = G.scoreByMat[iPlyr] + '点';
        } else {
            // 小さいもの順ソートの邪魔にならないようにする。
            G.matThetaArr[iPlyr] = Number.MAX_VALUE;
        }
    }

    // 小さい順に並べる。
    let sorted = G.matThetaArr.slice().sort(function (a, b) {
            return a - b
        });
    // 一番小さいものに 0、二番目に小さいものに 1、と付く。 FIXME: 同着は被ってしまう。
    G.matThetaRankArr = G.matThetaArr.slice().map(function (x) {
            return sorted.indexOf(x)
        });

    // Current player.
    if (G.currentPlayer !== -1) {
        highlightPlayer(G.currentPlayer);
    }
}
