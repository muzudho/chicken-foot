/**
 * Start up.
 * @authore muzudho
 * @module js/start-up
 */

function startupMove(suffix) {
    "use strict";
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

        entryPlayerNum: 0,
        tileNumByPlayer: 0,
        tileNumbers: [],
        scoreByDeck: []
    };

    // Title scene division.
    let titleSceneDiv = document.getElementById('titleScene');
    titleSceneDiv.style.display = "block";

    // Positioning scene division.
    let positioningSceneDiv = document.getElementById('positioningScene');
    positioningSceneDiv.style.display = "none";
    
    // Game scene division.
    let gameSceneDiv = document.getElementById('gameScene');
    gameSceneDiv.style.display = "none";

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

    // Entry player count buttons.
    for (let iPlyr = 2; iPlyr < 9; iPlyr += 1) {
        let plyrBtn = document.getElementById('playerNum' + iPlyr);
        /**
         * @param {number} playerNum - プレイヤー人数
         */
        plyrBtn.onclick = onclickPlyrBtn;
        plyrBtn.onmouseover = onMouseOverBtn;
    }

    // Positioning finish button.
    let positioningFinishBtn = document.getElementById('positioningFinishButton');
    positioningFinishBtn.onclick = function(event) {
        positioningFinishBtn.style.display = "none";
        
        // Game scene division.
        let gameSceneDiv = document.getElementById('gameScene');
        gameSceneDiv.style.display = "block";
        
        executeAutoTilePosition();
    };
    
    
    // Total score text boxes.
    for (let iPlyr = 0; iPlyr < 8; iPlyr += 1) {
        let totalTbx = document.getElementById('total' + iPlyr);
        totalTbx.value = 0;
    }

    // Round end button.
    let roundEndBtn = document.getElementById('roundEndButton');
    roundEndBtn.onclick = function (event) {
        refreshScoreByAllDecks();

        // Total score text boxes.
        for (let iPlyr = 0; iPlyr < 8; iPlyr += 1) {
            let elmTotal = document.getElementById('total' + iPlyr);
            elmTotal.value = parseInt(elmTotal.value, 10) + G.scoreByDeck[iPlyr];
        }
    };

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
