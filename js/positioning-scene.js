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
}

function executeAutoTilePosition() {
    "use strict";
    let usedTileCount = 0;

    // Player decks.
    for (let iDeck = 0; iDeck < G.entryPlayerNum; iDeck += 1) {
        let elmDeck = document.getElementById('deck' + iDeck);

        for (let kTileN = 0; kTileN < G.tileNumByPlayer; kTileN += 1) {
            let elmTile = document.getElementById('tile' + G.tileNumbers[usedTileCount]);
            elmTile.style.left = (parseInt(elmDeck.style.left, 10) + kTileN % (G.tileNumByPlayer / 2) * 32 + 20) + 'px';
            elmTile.style.top = (parseInt(elmDeck.style.top, 10) + (Math.floor(kTileN / (G.tileNumByPlayer / 2)) * 64) + 20) + 'px';
            elmTile.style.border = "solid 2px " + elmDeck.style.borderColor;
            elmTile.style.display = "block";
            usedTileCount += 1;
        }
    }

    // Stack. Turn tile to back.
    let elmDeckS = document.getElementById('deckS');
    let m = 0;
    for (; usedTileCount < G.tileNumbers.length; usedTileCount += 1) {
        let elmTile = document.getElementById('tile' + G.tileNumbers[usedTileCount]);
        elmTile.style.left = (parseInt(elmDeckS.style.left, 10) + m * 32 + 20) + 'px';
        elmTile.style.top = (parseInt(elmDeckS.style.top, 10) + 20) + 'px';
        elmTile.style.display = 'block';
        elmTile.style.src = getTilePath('empty');
        m += 1;
    }
}
