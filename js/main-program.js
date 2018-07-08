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

        // Initialize model. Such as global valiables.
        gModelHelper.initialize();

        // Set up view.
        // - Title scene elements.
        // - Positioning scene elements.
        // - Game scene elements.
        document.querySelectorAll('.title-scene').forEach(function (titleSceneElm) {
            titleSceneElm.style.display = "block";
        });
        document.querySelectorAll('.positioningScene').forEach(function (positioningSceneElm) {
            positioningSceneElm.style.display = "none";
        });
        document.querySelectorAll('.game-scene').forEach(function (gameSceneElm) {
            gameSceneElm.style.display = "none";
        });

        gDynamicStyle.loadDynamicStyleAll();

        // Set up entry player count buttons.
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

        // Set up positioning finish button.
        let positioningFinishBtn = document.getElementById('positioningFinishButton');
        positioningFinishBtn.onclick = function (event) {
            gPositioningScene.onPositioningFinishButtonClicked(event);
        }

        // Total score text boxes.
        gViewHelper.clearTotal();

        // Set up round end button.
        let roundEndBtn = document.getElementById('roundEndButton');
        roundEndBtn.onclick = function (event) {
            gRuleHelper.refreshScoreByAllMats();
            gViewHelper.updateTotalBasedOnMat();
        };

        // Set up next player button.
        let nextPlayerBtn = document.getElementById('nextPlayerButton');
        nextPlayerBtn.onclick = function (event) {
            gModelHelper.turnToNextPlayer();
        };

        // Set up board. ドロップされる側
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

        // Set up tiles.
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
                    let tileNumber = gStringFormat.getNumberByTileId(event.target.id);
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
        gRuleHelper.refreshScoreByAllMats();

        let elmRP = document.getElementById('matRP');
        let rpCenter = gDynamicStyle.getMatCenter('RP');

        // Mats.
        for (let iPlyr = 0; iPlyr < PLYR_MAX_LEN; iPlyr += 1) {
            if (iPlyr < G.entryPlayerNum) {
                // Angle.
                let elmMat = document.getElementById('mat' + iPlyr);
                let matCenter = gDynamicStyle.getMatCenter(iPlyr);
                // theta = atan2( y, x)
                G.matThetaArr[iPlyr] = Math.atan2(matCenter.y - rpCenter.y, matCenter.x - rpCenter.x);

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

        /*
        // For debug.
        console.log('root pibot x: '+rpCenter.x+' y: '+rpCenter.y);
        for (let iPlyr = 0; iPlyr < PLYR_MAX_LEN; iPlyr += 1) {
        let matCenter = gDynamicStyle.getMatCenter(iPlyr);
        console.log('['+iPlyr+'] ('+matCenter.x+', '+matCenter.y+') theta: '+G.matThetaArr[iPlyr]+' rank: '+G.matThetaRankArr[iPlyr]);
        }
         */

        // Current player.
        if (G.currentPlayer !== -1) {
            gRuleHelper.highlightPlayer(G.currentPlayer);
        }
    }
};
