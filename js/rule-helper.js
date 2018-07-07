/**
 * Game rule helper.
 * @authore muzudho
 * @module js/rule-helper
 */

function refreshScoreByAllMats() {
    "use strict";
    // Mats.
    for (let iMat = 0; iMat < PLYR_MAX_LEN; iMat += 1) {
        let elmMat = document.getElementById('mat' + iMat);
        G.scoreByMat[iMat] = 0;
        // Tiles.
        for (let iTile = 0; iTile < G.tileNumbers.length; iTile += 1) {
            let tileNum = G.tileNumbers[iTile];
            let idTile = 'tile' + tileNum;
            let elmTile = document.getElementById(idTile);
            if (isIntersect(elmTile, elmMat)) {
                if (tileNum === 0) {
                    // ダブル ブランクの失点は 50点。
                    G.scoreByMat[iMat] -= 50;
                } else {
                    G.scoreByMat[iMat] -= tileNum;
                }
            }
        }
    }
}
