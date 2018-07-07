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

/**
 * Angle が1番小さいもの
 * 参考: https://goma.pw/article/2017-01-31-0/ |2017-01-31「JS：Array内の数値の順位を求める」
 */
function getFirstPlayerIndex() {
    "use strict";
    return G.matThetaRankArr.indexOf(0);
}

function highlightPlayer(highlightPlyr) {
    "use strict";
    // Mat opacity.
    let iPlyr = 0;
    for (; iPlyr < PLYR_MAX_LEN; iPlyr += 1) {
        if (iPlyr != G.currentPlayer && iPlyr < G.entryPlayerNum) {
            setMatToOpacityMax(iPlyr, true);
        } else {
            setMatToOpacityMax(iPlyr, false);
        }
    }
    setMatToOpacityMax(highlightPlyr, false);
}
