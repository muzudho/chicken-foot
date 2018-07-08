/**
 * Search view. And result to model.
 * @authore Muzudho
 * @module js/view-helper.js
 */

var gViewHelper = {
    /**
     * Set up view.
     * - Title scene elements.
     * - Positioning scene elements.
     * - Game scene elements.
     */
    setupMainProgram: function() {
        document.querySelectorAll('.title-scene').forEach(function (titleSceneElm) {
            titleSceneElm.style.display = "block";
        });
        document.querySelectorAll('.positioningScene').forEach(function (positioningSceneElm) {
            positioningSceneElm.style.display = "none";
        });
        document.querySelectorAll('.game-scene').forEach(function (gameSceneElm) {
            gameSceneElm.style.display = "none";
        });
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
        
        // Set up tiles.
        for (let iTile = 0; iTile < G.tileNumbers.length; iTile += 1) {
            let tileNumber = G.tileNumbers[iTile];
            let idTile = 'tile' + tileNumber;
            let elmTile = document.getElementById(idTile);
            if (elmTile !== null) {
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
    },
    selectHandTailsByPlayer: function () {
        // Clear model.
        G.handList = [];

        // Search mat views.
        for (let iPlyr = 0; iPlyr < PLYR_MAX_LEN; iPlyr += 1) {
            // Clear model.
            G.handList[iPlyr] = [];
            let elmMat = document.getElementById('mat' + iPlyr);
            // Search tile views.
            for (let iTile = 0; iTile < G.tileNumbers.length; iTile += 1) {
                let tileNum = G.tileNumbers[iTile];
                let elmTile = document.getElementById('tile' + tileNum);
                if (gIntersect.isIntersect(elmTile, elmMat)) {
                    // Set up model.
                    G.handList[iPlyr].push(tileNum);
                }
            }
        }

        // gDebugHelper.showHandList();
    },
    clearTotal: function () {
        for (let iPlyr = 0; iPlyr < PLYR_MAX_LEN; iPlyr += 1) {
            let totalTbx = document.getElementById('total' + iPlyr);
            totalTbx.value = 0;
        }
    },
    /** Total score text boxes. */
    updateTotalBasedOnMat: function () {
        for (let iPlyr = 0; iPlyr < PLYR_MAX_LEN; iPlyr += 1) {
            let elmTotal = document.getElementById('total' + iPlyr);
            elmTotal.value = parseInt(elmTotal.value, 10) + G.scoreByMat[iPlyr];
        }
    }
};
