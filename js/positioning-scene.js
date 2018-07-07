/**
 * Game start.
 * @authore muzudho
 * @module js/game-start
 */

function onPositioningFinishButtonClicked(event) {
    "use strict";
    // Positioning finish button.
    let thisBtn = document.getElementById(event.target.id);
    thisBtn.style.display = "none";

    // Game scene elements.
    document.querySelectorAll('.game-scene').forEach(function (gameSceneElm) {
        gameSceneElm.style.display = "block";
    });

    let iPlyr;
    // Score elements is visible/hidden.
    iPlyr = 0;
    document.querySelectorAll('.score').forEach(function (scoreElm) {
        if (iPlyr < G.entryPlayerNum) {
            scoreElm.style.display = 'block';
        } else {
            scoreElm.style.display = 'none';
        }
        iPlyr += 1;
    });

    // Total-container elements is visible/hidden.
    iPlyr = 0;
    document.querySelectorAll('.total-container').forEach(function (totalCntElm) {
        if (iPlyr < G.entryPlayerNum) {
            totalCntElm.style.display = 'block';
        } else {
            totalCntElm.style.display = 'none';
        }
        iPlyr += 1;
    });

    // Tile positioning.
    executeAutoTilePosition();

    /*TODO
    // Mat is visible/hidden.
    iPlyr = 0;
    for (; iPlyr < PLYR_MAX_LEN; iPlyr += 1) {
    if (iPlyr < G.entryPlayerNum) {
    setMatToOpacityMax(iPlyr, true);
    } else {
    setMatToOpacityMax(iPlyr, false);
    }
    }
     */
}

function executeAutoTilePosition() {
    "use strict";
    let usedTileCount = 0;

    // Player mats.
    for (let iPlyr = 0; iPlyr < G.entryPlayerNum; iPlyr += 1) {
        let elmMat = document.getElementById('mat' + iPlyr);

        for (let kTileN = 0; kTileN < G.tileNumByPlayer; kTileN += 1) {
            let elmTile = document.getElementById('tile' + G.tileNumbers[usedTileCount]);
            elmTile.style.left = (parseInt(elmMat.style.left, 10) + kTileN % (G.tileNumByPlayer / 2) * 32 + 20) + 'px';
            elmTile.style.top = (parseInt(elmMat.style.top, 10) + (Math.floor(kTileN / (G.tileNumByPlayer / 2)) * 64) + 20) + 'px';
            elmTile.style.border = "solid 2px " + elmMat.style.borderColor;
            elmTile.style.display = "block";
            usedTileCount += 1;
        }
    }

    // Library. Turn tile to back.
    let elmMatLib = document.getElementById('matLib');
    let m = 0;
    for (; usedTileCount < G.tileNumbers.length; usedTileCount += 1) {
        let elmTile = document.getElementById('tile' + G.tileNumbers[usedTileCount]);
        elmTile.style.left = (parseInt(elmMatLib.style.left, 10) + m * 32 + 20) + 'px';
        elmTile.style.top = (parseInt(elmMatLib.style.top, 10) + 20) + 'px';
        elmTile.style.display = 'block';
        elmTile.src = getTilePath('empty');
        m += 1;
    }
}
