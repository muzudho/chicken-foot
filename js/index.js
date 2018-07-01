/**
 * Chicken foot.
 * @module js/index
 */
/*jslint es6 */

const DECK_NUM = 8;

/** Global variables. */
G = {};

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 * {@Link https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array |2011-06-08 How can I shuffle an array?}
 */
function shuffle(a) {
    "use strict";
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function onResize() {
    "use strict";
    let elmRootPibot = document.getElementById('rootPibot');
    elmRootPibot.style.left = (window.innerWidth / 2 + 32) + "px";
    elmRootPibot.style.top = (window.innerHeight / 2 + 132) + "px";
}

function onclickPlyrBtn(event) {
    "use strict";
    let id = event.target.id;
    // playerNum1
    let iPlyrN = parseInt(id.slice(9, 10), 10);

    for (let jDeckN = 0; jDeckN < 8; jDeckN += 1) {
        let elmDeck = document.getElementById('deck' + jDeckN);
        let elmScore = document.getElementById('score' + jDeckN);
        if (jDeckN < iPlyrN) {
            elmDeck.style.display = "block";
            elmScore.style.display = "block";
        } else {
            elmDeck.style.display = "none";
            elmDeck.style.width = 0;
            elmDeck.style.height = 0;
            elmScore.style.display = "none";
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

    let elmRootPibot = document.getElementById('rootPibot');
    let lTile = 0;
    let radius = Math.min(window.innerWidth, window.innerHeight) / 2 * 0.7;
    for (let iDeck = 0; iDeck < iPlyrN; iDeck += 1) {
        let elmDeck = document.getElementById('deck' + iDeck);
        let elmScore = document.getElementById('score' + iDeck);
        elmDeck.style.width = ((tileNum / 2 + 1.5) * 32) + "px";
        elmDeck.style.height = (2 * 64 + 32 * 1.25) + "px";

        let theta = iDeck / iPlyrN * 2 * Math.PI;
        elmDeck.style.left = radius * Math.cos(theta) + (parseInt(elmRootPibot.style.left, 10) + 64 / 2) - parseInt(elmDeck.style.width, 10) / 2 + "px";
        elmDeck.style.top = radius * Math.sin(theta) + (parseInt(elmRootPibot.style.top, 10) + 64 / 2) - parseInt(elmDeck.style.height, 10) / 2 + "px";

        elmScore.style.left = elmDeck.style.left;
        elmScore.style.top = (parseInt(elmDeck.style.top, 10) - 60) + 'px';

        for (let kTileN = 0; kTileN < tileNum; kTileN += 1) {
            let elmTile = document.getElementById('tile' + G.tileNumbers[lTile]);
            elmTile.style.left = (parseInt(elmDeck.style.left, 10) + kTileN % (tileNum / 2) * 32 + 20) + 'px';
            elmTile.style.top = (parseInt(elmDeck.style.top, 10) + (Math.floor(kTileN / (tileNum / 2)) * 64) + 20) + 'px';
            elmTile.style.border = "solid 2px " + elmDeck.style.borderColor;
            lTile += 1;
        }
    }

    let elmMountain = document.getElementById('mountain');
    elmMountain.style.width = ((55 - iPlyrN * tileNum + 1.5) * 32) + "px";
    let m = 0;
    for (; lTile < G.tileNumbers.length; lTile += 1) {
        let elmTile = document.getElementById('tile' + G.tileNumbers[lTile]);
        elmTile.style.left = (parseInt(elmMountain.style.left, 10) + m * 32 + 20) + 'px';
        elmTile.style.top = (parseInt(elmMountain.style.top, 10) + 20) + 'px';
        m += 1;
    }

}

function onInterval() {
    "use strict";

    // Decks.
    for (let iDeck = 0; iDeck < 8; iDeck += 1) {
        let elmDeck = document.getElementById('deck' + iDeck);
        G.scoreByDeck[iDeck] = 0;
        // Tiles.
        for (let iTile = 0; iTile < G.tileNumbers.length; iTile += 1) {
            let tileNum = G.tileNumbers[iTile];
            let idTile = 'tile' + tileNum;
            let elmTile = document.getElementById(idTile);
            if (isIntersect(elmTile, elmDeck)) {
                if (tileNum === 0) {
                    // ダブル ブランクの失点は 50点。
                    G.scoreByDeck[iDeck] += 50;
                } else {
                    G.scoreByDeck[iDeck] += tileNum;
                }
            }
        }

        let elmScore = document.getElementById('score' + iDeck);
        elmScore.innerHTML = G.scoreByDeck[iDeck] + '点';
    }
}

function onLoad() {
    "use strict";
    G = {
        /** 0 <= x < 360 */
        angleDeg: [],
        /** mouse-drag.js */
        mouseDrag: {
            holdPoint: {
                x: 0,
                y: 0
            }
        },

        tileNumbers: [],
        scoreByDeck: []
    };

    // 配列に 存在するタイルの数字を入れる。
    let k = 0;
    for (let j = 0; j < 10; j += 1) {
        for (let i = 0; i < 10; i += 1) {
            if (i <= j) {
                G.tileNumbers[k] = 10 * i + j;
                k += 1;
            } else {
                break;
            }
        }
    }

    loadDynamicStyle();

    // Player number buttons.
    for (let iPlyrN = 2; iPlyrN < 9; iPlyrN += 1) {
        let plyrBtn = document.getElementById('playerNum' + iPlyrN);
        /**
         * @param {number} playerNum - プレイヤー人数
         */
        plyrBtn.onclick = onclickPlyrBtn;
    }

    // Board. ドロップされる側
    let board = document.getElementById('board');
    board.ondragover = function (event) {
        event.dataTransfer.dropEffect = 'move';
        // ドロップ許可
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            return false;
        }
    };

    // Tiles.
    for (let iTile = 0; iTile < G.tileNumbers.length; iTile += 1) {
        let idTile = 'tile' + G.tileNumbers[iTile];
        let elmTile = document.getElementById(idTile);
        if (elmTile !== null) {
            G.angleDeg[idTile] = 0;
            elmTile.draggable = true;

            // https://hakuhin.jp/js/data_transfer.html#DATA_TRANSFER_04
            elmTile.ondragstart = onDragStart;
            // event.dataTransfer.effectAllowed = 'move';

            // タイルの上にも落としたい
            elmTile.ondragover = function (event) {
                event.dataTransfer.dropEffect = 'move';
                // ドロップ許可
                if (event.preventDefault) {
                    event.preventDefault();
                } else {
                    return false;
                }
            };

            elmTile.ondrag = onDrag;

            /**
             * Clicked tag such as img.
             * @param {string} id - HTML tag id.
             */
            elmTile.onclick = function (event) {
                let id = event.target.id;
                G.angleDeg[id] = (G.angleDeg[id] + 30) % 360;
                document.getElementById(id).style.transform = 'rotate(' + G.angleDeg[id] + 'deg)';
            };
        }
    }

    setInterval(onInterval, 3000);
}
