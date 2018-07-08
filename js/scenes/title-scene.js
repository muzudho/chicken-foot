/**
 * Title scene.
 * @authore Muzudho
 * @module js/scenes/title-scene
 */

var gTitleScene = {
    /**
     * Set up view.
     * - Title scene elements.
     * - Positioning scene elements.
     * - Game scene elements.
     */
    initOnTimer: () => {
        "use strict";
        document.querySelectorAll('.title-scene').forEach((titleSceneElm) => {
            titleSceneElm.style.display = "block";
        });
        document.querySelectorAll('.positioningScene').forEach((positioningSceneElm) => {
            positioningSceneElm.style.display = "none";
        });
        document.querySelectorAll('.game-scene').forEach((gameSceneElm) => {
            gameSceneElm.style.display = "none";
        });
        // Set up entry player count buttons.
        for (let iPlyr = 2; iPlyr < (PLYR_MAX_LEN + 1); iPlyr += 1) {
            let plyrBtn = document.getElementById('playerNum' + iPlyr);
            /**
             * @param {number} playerNum - プレイヤー人数
             */
            plyrBtn.onclick = (event) => {
                gTitleScene.onclickPlyrBtn(event);
            };
            plyrBtn.onmouseover = (event) => {
                gTitleScene.onmouseoverEntryPlayerCountButton(event);
            };
        }
        // Set up positioning finish button.
        let positioningFinishBtn = document.getElementById('positioningFinishButton');
        positioningFinishBtn.onclick = (event) => {
            gPositioningScene.onclickPositioningFinishButton(event);
        }
        // Total score text boxes.
        gViewHelper.clearTotal();

        // Set up board. ドロップされる側
        let board = document.getElementById('board');
        board.ondragover = (event) => {
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
                elmTile.ondragstart = (event) => {
                    gMouseDrag.ondragstartElement(event);
                    // event.dataTransfer.effectAllowed = 'move';
                };

                // タイルの上にも落としたい
                elmTile.ondragover = (event) => {
                    event.dataTransfer.dropEffect = 'move';
                    // ドロップ許可
                    if (event.preventDefault) {
                        event.preventDefault();
                    } else {
                        return false;
                    }
                };

                elmTile.ondrag = (event) => {
                    gMouseDrag.ondragTile(event);
                };

                /** Clicked tag such as img. */
                elmTile.onmouseup = (event) => {
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

        // Set up moves.
        for (let iMat = 0; iMat < PLYR_MAX_LEN; iMat += 1) {
            gTitleScene.setupMove(iMat);
        }
        gTitleScene.setupMove('Lib');
        gTitleScene.setupMove('RP');

        gMainProgram.forwardScene('title', 'frameOnTimer');
    },
    frameOnTimer: () => {},
    setupMove: (suffix) => {
        "use strict";
        let elmMove = document.getElementById('move' + suffix);
        elmMove.draggable = true;
        elmMove.ondragstart = (event) => {
            gMouseDrag.ondragstartElement(event);
        };
        elmMove.ondrag = (event) => {
            gMouseDrag.ondragMoveIcon(event);
        };
    },
    layoutMove: (suffix) => {
        "use strict";
        let elmMat = document.getElementById('mat' + suffix);
        let elmMove = document.getElementById('move' + suffix);
        elmMove.style.left = (parseInt(elmMat.style.left, 10) - 36) + 'px';
        elmMove.style.top = elmMat.style.top;
    },
    onclickPlyrBtn: (event) => {
        "use strict";
        let id = event.target.id;
        G.entryPlayerNum = gStringFormat.getNumberByEntryPlayerButtonId(id);

        // Title scene elements is hidden.
        document.querySelectorAll('.title-scene').forEach((titleSceneElm) => {
            titleSceneElm.style.display = "none";
        });

        gMainProgram.forwardScene('positioning', 'initOnTimer');
    },
    onmouseoverEntryPlayerCountButton: (event) => {
        "use strict";
        let id = event.target.id;
        // ex) playerNum1 button
        G.entryPlayerNum = parseInt(id.slice(9, 10), 10);

        gViewHelper.executeAutoPosition();
    }
};
