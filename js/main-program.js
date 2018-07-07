/**
 * Main loop. Timer pseudo thread.
 * @authore muzudho
 * @module js/main-program
 */

const PLYR_MAX_LEN = 8;
const LIBRARY_MAT_INDEX = 8;
const ROUTE_PIBOT_MAT_INDEX = 9;

/** Global variables. */
G = {};

var gMainProgram = {
    initialize: function () {
        "use strict";

        /* Global */
        G = {
            /** 0 <= x < 360. */
            angleDegByTile: [],

            /** -1 is nobody. This is player id. */
            currentPlayer: -1,

            entryPlayerNum: 0,

            /** radius */
            matThetaArr: [],
            /** Index is player id. */
            matThetaRankArr: [],

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

            scene: "#main-program",
            scoreByMat: [],

            tileNumbers: [],
            tileNumByPlayer: 0,

            z: "" // nothing comma
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
        for (let iPlyr = 2; iPlyr < (PLYR_MAX_LEN + 1); iPlyr += 1) {
            let plyrBtn = document.getElementById('playerNum' + iPlyr);
            /**
             * @param {number} playerNum - プレイヤー人数
             */
            plyrBtn.onclick = function (event) {
                gTitleScene.onclickPlyrBtn(event);
            };
            plyrBtn.onmouseover = function (event) {
                gTitleScene.onEntryPlayerCountButtonMouseOver(event);
            };
        }

        // Positioning finish button.
        let positioningFinishBtn = document.getElementById('positioningFinishButton');
        positioningFinishBtn.onclick = function (event) {
            gPositioningScene.onPositioningFinishButtonClicked(event);
        }

        // Total score text boxes.
        for (let iPlyr = 0; iPlyr < PLYR_MAX_LEN; iPlyr += 1) {
            let totalTbx = document.getElementById('total' + iPlyr);
            totalTbx.value = 0;
        }

        // Round end button.
        let roundEndBtn = document.getElementById('roundEndButton');
        roundEndBtn.onclick = function (event) {
            refreshScoreByAllMats();

            // Total score text boxes.
            for (let iPlyr = 0; iPlyr < PLYR_MAX_LEN; iPlyr += 1) {
                let elmTotal = document.getElementById('total' + iPlyr);
                elmTotal.value = parseInt(elmTotal.value, 10) + G.scoreByMat[iPlyr];
            }
        };

        // Next player button.
        let nextPlayerBtn = document.getElementById('nextPlayerButton');
        nextPlayerBtn.onclick = function (event) {
            let rank = G.matThetaRankArr[G.currentPlayer];
            if (rank < G.entryPlayerNum - 1) {
                rank += 1;
            } else {
                rank = 0;
            }
            G.currentPlayer = G.matThetaRankArr.indexOf(rank);
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

        gTitleScene.initialize();

        // Tiles.
        for (let iTile = 0; iTile < G.tileNumbers.length; iTile += 1) {
            let tileNumber = G.tileNumbers[iTile];
            let idTile = 'tile' + tileNumber;
            let elmTile = document.getElementById(idTile);
            if (elmTile !== null) {
                G.angleDegByTile[tileNumber] = 0;
                elmTile.draggable = true;

                // https://hakuhin.jp/js/data_transfer.html#DATA_TRANSFER_04
                elmTile.ondragstart = function (event) {
                    gMouseDrag.onDragStart(event);
                    // event.dataTransfer.effectAllowed = 'move';
                };

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

                elmTile.ondrag = function (event) {
                    gMouseDrag.onTileDrag(event);
                };

                /** Clicked tag such as img. */
                elmTile.onmouseup = function (event) {
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

        G.scene = 'title';
    },
    onFrame: function () {
        "use strict";
        refreshScoreByAllMats();

        let elmRP = document.getElementById('matRP');
        let rpCenter = getMatCenter('RP');

        // Mats.
        for (let iPlyr = 0; iPlyr < PLYR_MAX_LEN; iPlyr += 1) {
            if (iPlyr < G.entryPlayerNum) {
                // Angle.
                let elmMat = document.getElementById('mat' + iPlyr);
                let matCenter = getMatCenter(iPlyr);
                G.matThetaArr[iPlyr] = Math.atan2(matCenter.x - rpCenter.x, matCenter.y - rpCenter.y);

                // Score.
                let elmScore = document.getElementById('score' + iPlyr);
                elmScore.innerHTML = G.scoreByMat[iPlyr] + '点';
            } else {
                // 小さいもの順ソートの邪魔にならないようにする。
                G.matThetaArr[iPlyr] = Number.MAX_VALUE;
            }
        }

        // 小さい順に並べる。
        let sorted = G.matThetaArr.slice().sort(function (a, b) {
                return a - b
            });
        // 一番小さいものに 0、二番目に小さいものに 1、と付く。 FIXME: 同着は被ってしまう。
        G.matThetaRankArr = G.matThetaArr.slice().map(function (x) {
                return sorted.indexOf(x)
            });

        // Current player.
        if (G.currentPlayer !== -1) {
            highlightPlayer(G.currentPlayer);
        }
    }
};
