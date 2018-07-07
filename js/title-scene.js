/**
 * Start up.
 * @authore muzudho
 * @module js/title-scene
 */

function startupMove(suffix) {
    "use strict";
    let elmMove = document.getElementById('move' + suffix);
    elmMove.draggable = true;
    elmMove.ondragstart = onDragStart;
    elmMove.ondrag = onDragMoveIcon;
}

function onEntryPlayerCountButtonMouseOver(event) {
    "use strict";
    let id = event.target.id;
    // ex) playerNum1 button
    G.entryPlayerNum = parseInt(id.slice(9, 10), 10);

    executeAutoPosition();
}

function onLoad() {
    "use strict";
    G = {
        scene: "title",

        /** 0 <= x < 360. */
        angleDegByTile: [],
        /** radius */
        currentMatAngleRadByPlayer: [],

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

    // Title scene elements.
    document.querySelectorAll('.title-scene').forEach(function (titleSceneElm) {
        titleSceneElm.style.display = "block";
    });

    // Positioning scene elements.
    document.querySelectorAll('.positioningScene').forEach(function (positioningSceneElm) {
        positioningSceneElm.style.display = "none";
    });

    // Game scene elements.
    document.querySelectorAll('.game-scene').forEach(function (gameSceneElm) {
        gameSceneElm.style.display = "none";
    });

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
        plyrBtn.onmouseover = onEntryPlayerCountButtonMouseOver;
    }

    // Positioning finish button.
    let positioningFinishBtn = document.getElementById('positioningFinishButton');
    positioningFinishBtn.onclick = onPositioningFinishButtonClicked;

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
    startupMove('S');
    startupMove('RP');

    // Tiles.
    for (let iTile = 0; iTile < G.tileNumbers.length; iTile += 1) {
        let tileNumber = G.tileNumbers[iTile];
        let idTile = 'tile' + tileNumber;
        let elmTile = document.getElementById(idTile);
        if (elmTile !== null) {
            G.angleDegByTile[tileNumber] = 0;
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

            elmTile.ondrag = onTileDrag;

            /** Clicked tag such as img. */
            elmTile.onmousedown = function (event) {
                let tileNumber = getNumberByTileId(event.target.id);
                let angle;
                switch (event.which) {
                case 1:
                    // Mouse left button pressed.
                    angle = 30;
                    break;
                case 3:
                    // Mouse right button pressed.
                    angle = -30;
                    break;
                }
                G.angleDegByTile[tileNumber] = (G.angleDegByTile[tileNumber] + angle) % 360;
                document.getElementById(event.target.id).style.transform = 'rotate(' + G.angleDegByTile[tileNumber] + 'deg)';
            };
        }
    }

    setInterval(onInterval, 3000);
}

function startMove(suffix) {
    "use strict";
    let elmDeck = document.getElementById('deck' + suffix);
    let elmMove = document.getElementById('move' + suffix);
    elmMove.style.left = (parseInt(elmDeck.style.left, 10) - 36) + 'px';
    elmMove.style.top = elmDeck.style.top;
}

function executeAutoPosition() {
    // Visibility.
    let iPlyr = 0;
    for (; iPlyr < 8; iPlyr += 1) {
        let elmDeck = document.getElementById('deck' + iPlyr);
        let elmScore = document.getElementById('score' + iPlyr);
        if (iPlyr < G.entryPlayerNum) {
            elmDeck.style.display = "block";
        } else {
            elmDeck.style.display = "none";
            elmDeck.style.width = 0;
            elmDeck.style.height = 0;
        }
    }

    // root pibot, deck, score, move icon.
    let elmDeckRP = document.getElementById('deckRP');
    let usedTileCount = 0;
    let radius = Math.min(window.innerWidth, window.innerHeight) / 2 * 0.7;
    for (iPlyr = 0; iPlyr < G.entryPlayerNum; iPlyr += 1) {
        let elmDeck = document.getElementById('deck' + iPlyr);
        let elmScore = document.getElementById('score' + iPlyr);

        elmDeck.style.width = ((G.tileNumByPlayer / 2 + 1.5) * 32) + 'px';
        elmDeck.style.height = (2 * 64 + 32 * 1.25) + 'px';

        let theta = iPlyr / G.entryPlayerNum * 2 * Math.PI;
        console.log('iPlyr=' + iPlyr + ' theta=' + theta);
        elmDeck.style.left = radius * Math.cos(theta) + (parseInt(elmDeckRP.style.left, 10) + 64 / 2) - parseInt(elmDeck.style.width, 10) / 2 + 'px';
        elmDeck.style.top = radius * Math.sin(theta) + (parseInt(elmDeckRP.style.top, 10) + 64 / 2) - parseInt(elmDeck.style.height, 10) / 2 + 'px';

        elmScore.style.left = elmDeck.style.left;
        elmScore.style.top = (parseInt(elmDeck.style.top, 10) - 60) + 'px';

        startMove(iPlyr);
    }
    startMove('S');
    startMove('RP');

    // stack
    let elmDeckS = document.getElementById('deckS');
    elmDeckS.style.width = ((55 - G.entryPlayerNum * G.tileNumByPlayer + 1.5) * 32) + 'px';
    elmDeckS.style.height = (64 + 32 * 1.25) + 'px';
}

function onclickPlyrBtn(event) {
    "use strict";
    let id = event.target.id;
    G.entryPlayerNum = getNumberByEntryPlayerButtonId(id);

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

    G.scene = 'positioning';

    executeAutoPosition();

    // Title scene elements is hidden.
    document.querySelectorAll('.title-scene').forEach(function (titleSceneElm) {
        titleSceneElm.style.display = "none";
    });

    // Positioning scene elements is visible.
    document.querySelectorAll('.positioning-scene').forEach(function (positioningSceneElm) {
        positioningSceneElm.style.display = "block";
    });

    // Move-icon elements is visible.
    let iPlyr = 0;
    document.querySelectorAll('i.move').forEach(function (moveElm) {
        if (iPlyr < G.entryPlayerNum) {
            moveElm.style.display = "block";
        } else {
            moveElm.style.display = "none";
        }
        iPlyr += 1;
    });
    document.getElementById('moveS').style.display = 'block';
    document.getElementById('moveRP').style.display = 'block';

    // Mats.
    document.getElementById('deckS').style.display = 'block';
    document.getElementById('deckRP').style.display = 'block';
}
