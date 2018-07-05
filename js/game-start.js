/**
 * Game start.
 * @authore muzudho
 * @module js/game-start
 */

function startMove(suffix) {
    "use strict";
    let elmDeck = document.getElementById('deck' + suffix);
    let elmMove = document.getElementById('move' + suffix);
    elmMove.style.left = (parseInt(elmDeck.style.left, 10) - 36) + 'px';
    elmMove.style.top = elmDeck.style.top;
}

function onMouseOverBtn(event) {
    "use strict";
    let id = event.target.id;
    // ex) playerNum1 button
    G.entryPlayerNum = parseInt(id.slice(9, 10), 10);
    
    executeAutoPosition();
}

function executeAutoTilePosition() {
}

function executeAutoPosition() {
    // Visibility.
    for (let iDeck = 0; iDeck < 8; iDeck += 1) {
        let elmDeck = document.getElementById('deck' + iDeck);
        let elmScore = document.getElementById('score' + iDeck);
        let elmMove = document.getElementById('move' + iDeck);
        if (iDeck < G.entryPlayerNum) {
            elmDeck.style.display = "block";
            elmScore.style.display = "block";
            elmMove.style.display = "block";
        } else {
            elmDeck.style.display = "none";
            elmDeck.style.width = 0;
            elmDeck.style.height = 0;
            elmScore.style.display = "none";
            elmMove.style.display = "none";
        }
    }
    
    // root pibot, deck, score, move icon.
    let elmDeckRP = document.getElementById('deckRP');
    let usedTileCount = 0;
    let radius = Math.min(window.innerWidth, window.innerHeight) / 2 * 0.7;
    for (let iDeck = 0; iDeck < G.entryPlayerNum; iDeck += 1) {
        let elmDeck = document.getElementById('deck' + iDeck);
        let elmScore = document.getElementById('score' + iDeck);

        elmDeck.style.width = ((G.tileNumByPlayer / 2 + 1.5) * 32) + 'px';
        elmDeck.style.height = (2 * 64 + 32 * 1.25) + 'px';

        let theta = iDeck / G.entryPlayerNum * 2 * Math.PI;
        elmDeck.style.left = radius * Math.cos(theta) + (parseInt(elmDeckRP.style.left, 10) + 64 / 2) - parseInt(elmDeck.style.width, 10) / 2 + 'px';
        elmDeck.style.top = radius * Math.sin(theta) + (parseInt(elmDeckRP.style.top, 10) + 64 / 2) - parseInt(elmDeck.style.height, 10) / 2 + 'px';

        elmScore.style.left = elmDeck.style.left;
        elmScore.style.top = (parseInt(elmDeck.style.top, 10) - 60) + 'px';

        startMove(iDeck);

        for (let kTileN = 0; kTileN < G.tileNumByPlayer; kTileN += 1) {
            let elmTile = document.getElementById('tile' + G.tileNumbers[usedTileCount]);
            elmTile.style.left = (parseInt(elmDeck.style.left, 10) + kTileN % (G.tileNumByPlayer / 2) * 32 + 20) + 'px';
            elmTile.style.top = (parseInt(elmDeck.style.top, 10) + (Math.floor(kTileN / (G.tileNumByPlayer / 2)) * 64) + 20) + 'px';
            elmTile.style.border = "solid 2px " + elmDeck.style.borderColor;
            usedTileCount += 1;
        }
    }
    startMove('M');
    startMove('RP');
    
    // mountain
    let elmDeckM = document.getElementById('deckM');
    elmDeckM.style.width = ((55 - G.entryPlayerNum * G.tileNumByPlayer + 1.5) * 32) + 'px';
    elmDeckM.style.height = (64 + 32 * 1.25) + 'px';
    let m = 0;
    for (; usedTileCount < G.tileNumbers.length; usedTileCount += 1) {
        let elmTile = document.getElementById('tile' + G.tileNumbers[usedTileCount]);
        elmTile.style.left = (parseInt(elmDeckM.style.left, 10) + m * 32 + 20) + 'px';
        elmTile.style.top = (parseInt(elmDeckM.style.top, 10) + 20) + 'px';
        m += 1;
    }
}

function onclickPlyrBtn(event) {
    "use strict";
    let id = event.target.id;
    // ex) playerNum1 button
    G.entryPlayerNum = parseInt(id.slice(9, 10), 10);

    // シャッフル
    G.tileNumbers = shuffle(G.tileNumbers);

    switch (G.entryPlayerNum) {
    case 2:
        // 21枚ずつ
        G.tileNumByPlayer = 21;
        break;
    case 3:
        // 14枚ずつ
        G.tileNumByPlayer = 14;
        break;
    case 4:
        // 11枚ずつ
        G.tileNumByPlayer = 11;
        break;
    case 5:
        // 8枚ずつ
        G.tileNumByPlayer = 8;
        break;
    case 6:
        // 7枚ずつ
        G.tileNumByPlayer = 7;
        break;
    case 7:
        // 6枚ずつ
        G.tileNumByPlayer = 6;
        break;
    default:
    case 8:
        // 5枚ずつ
        G.tileNumByPlayer = 5;
        break;
    }


    executeAutoPosition();

    
    // Visibility.
    for (let iDeck = 0; iDeck < 8; iDeck += 1) {
        let elmMove = document.getElementById('move' + iDeck);
        if (iDeck < G.entryPlayerNum) {
            elmMove.style.display = "block";
        } else {
            elmMove.style.display = "none";
        }
    }
    
    
    // Title scene division.
    let titleSceneDiv = document.getElementById('titleScene');
    titleSceneDiv.style.display = "none";

    // Positioning scene division.
    let positioningSceneDiv = document.getElementById('positioningScene');
    positioningSceneDiv.style.display = "block";
}
