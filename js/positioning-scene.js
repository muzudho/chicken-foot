/**
 * Game start.
 * @authore muzudho
 * @module js/game-start
 */

function onPositioningFinishButtonClicked(event) {
    // Positioning finish button.
    let thisBtn = document.getElementById(event.target.id);
    thisBtn.style.display = "none";
    
    // Game scene division.
    let gameSceneDiv = document.getElementById('gameScene');
    gameSceneDiv.style.display = "block";

    // Tile positioning.
    executeAutoTilePosition();
}

function onMouseOverBtn(event) {
    "use strict";
    let id = event.target.id;
    // ex) playerNum1 button
    G.entryPlayerNum = parseInt(id.slice(9, 10), 10);
    
    executeAutoPosition();
}

function executeAutoTilePosition() {
    let usedTileCount = 0;
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

    // mountain
    let elmDeckM = document.getElementById('deckM');
    let m = 0;
    for (; usedTileCount < G.tileNumbers.length; usedTileCount += 1) {
        let elmTile = document.getElementById('tile' + G.tileNumbers[usedTileCount]);
        elmTile.style.left = (parseInt(elmDeckM.style.left, 10) + m * 32 + 20) + 'px';
        elmTile.style.top = (parseInt(elmDeckM.style.top, 10) + 20) + 'px';
        elmTile.style.display = "block";
        m += 1;
    }
}


