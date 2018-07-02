/**
 * Start up.
 * @authore muzudho
 * @module js/start-up
 */

function startupMove(suffix) {
    let elmMove = document.getElementById('move' + suffix);
    elmMove.draggable = true;
    elmMove.ondragstart = onDragStart;
    elmMove.ondrag = onDragMoveIcon;
}

function onLoad() {
    "use strict";
    G = {
        /** 0 <= x < 360 */
        angleDeg: [],
        /** mouse-drag.js */
        mouseDrag: {
            startClient: {
                x: 0,
                y: 0
            },
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

    // Moves.
    for (let iDeck = 0; iDeck < 8; iDeck += 1) {
        startupMove(iDeck);
    }
    startupMove('M');
    startupMove('RP');

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
