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

function onclickPlyrBtn(event) {
    "use strict";
    let id = event.target.id;
    // playerNum1
    let iPlyrN = parseInt(id.slice(9, 10), 10);

    for (let iDeck = 0; iDeck < 8; iDeck += 1) {
        let elmDeck = document.getElementById('deck' + iDeck);
        let elmScore = document.getElementById('score' + iDeck);
        let elmMove = document.getElementById('move' + iDeck);
        if (iDeck < iPlyrN) {
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

    // シャッフル
    G.tileNumbers = shuffle(G.tileNumbers);

    let tileNum;
    switch (iPlyrN) {
    case 2:
        // 21枚ずつ
        tileNum = 21;
        break;
    case 3:
        // 14枚ずつ
        tileNum = 14;
        break;
    case 4:
        // 11枚ずつ
        tileNum = 11;
        break;
    case 5:
        // 8枚ずつ
        tileNum = 8;
        break;
    case 6:
        // 7枚ずつ
        tileNum = 7;
        break;
    case 7:
        // 6枚ずつ
        tileNum = 6;
        break;
    default:
    case 8:
        // 5枚ずつ
        tileNum = 5;
        break;
    }

    // root pibot
    let elmDeckRP = document.getElementById('deckRP');
    let lTile = 0;
    let radius = Math.min(window.innerWidth, window.innerHeight) / 2 * 0.7;
    for (let iDeck = 0; iDeck < iPlyrN; iDeck += 1) {
        let elmDeck = document.getElementById('deck' + iDeck);
        let elmScore = document.getElementById('score' + iDeck);

        elmDeck.style.width = ((tileNum / 2 + 1.5) * 32) + 'px';
        elmDeck.style.height = (2 * 64 + 32 * 1.25) + 'px';

        let theta = iDeck / iPlyrN * 2 * Math.PI;
        elmDeck.style.left = radius * Math.cos(theta) + (parseInt(elmDeckRP.style.left, 10) + 64 / 2) - parseInt(elmDeck.style.width, 10) / 2 + "px";
        elmDeck.style.top = radius * Math.sin(theta) + (parseInt(elmDeckRP.style.top, 10) + 64 / 2) - parseInt(elmDeck.style.height, 10) / 2 + "px";

        elmScore.style.left = elmDeck.style.left;
        elmScore.style.top = (parseInt(elmDeck.style.top, 10) - 60) + 'px';

        startMove(iDeck);

        for (let kTileN = 0; kTileN < tileNum; kTileN += 1) {
            let elmTile = document.getElementById('tile' + G.tileNumbers[lTile]);
            elmTile.style.left = (parseInt(elmDeck.style.left, 10) + kTileN % (tileNum / 2) * 32 + 20) + 'px';
            elmTile.style.top = (parseInt(elmDeck.style.top, 10) + (Math.floor(kTileN / (tileNum / 2)) * 64) + 20) + 'px';
            elmTile.style.border = "solid 2px " + elmDeck.style.borderColor;
            lTile += 1;
        }
    }
    startMove('M');
    startMove('RP');

    // mountain
    let elmDeckM = document.getElementById('deckM');
    elmDeckM.style.width = ((55 - iPlyrN * tileNum + 1.5) * 32) + 'px';
    elmDeckM.style.height = (64 + 32 * 1.25) + 'px';
    let m = 0;
    for (; lTile < G.tileNumbers.length; lTile += 1) {
        let elmTile = document.getElementById('tile' + G.tileNumbers[lTile]);
        elmTile.style.left = (parseInt(elmDeckM.style.left, 10) + m * 32 + 20) + 'px';
        elmTile.style.top = (parseInt(elmDeckM.style.top, 10) + 20) + 'px';
        m += 1;
    }

}
