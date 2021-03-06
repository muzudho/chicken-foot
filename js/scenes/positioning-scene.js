/**
 * Game start.
 * @authore Muzudho
 * @module js/scenes/positioning-scene
 */

var gPositioningScene = {
    initOnTimer: () => {
        "use strict";
        // シャッフル
        G.tileNumbers = gIndex.shuffle(G.tileNumbers);

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
        gViewHelper.executeAutoPosition();

        // Positioning scene elements is visible.
        document.querySelectorAll('.positioning-scene').forEach((positioningSceneElm) => {
            positioningSceneElm.style.display = "block";
        });

        // Move-icon elements is visible.
        let iPlyr = 0;
        document.querySelectorAll('i.move').forEach((moveElm) => {
            if (iPlyr < G.entryPlayerNum) {
                moveElm.style.display = "block";
            } else {
                moveElm.style.display = "none";
            }
            iPlyr += 1;
        });
        document.getElementById('move' + LIBRARY_MAT_INDEX).style.display = 'block';
        document.getElementById('move' + ROUTE_PIBOT_MAT_INDEX).style.display = 'block';

        // Mats.
        document.getElementById('mat' + LIBRARY_MAT_INDEX).style.display = 'block';
        document.getElementById('mat' + ROUTE_PIBOT_MAT_INDEX).style.display = 'block';

        gTalkHelper.talk('マットが被らないように、<br/>矢印をドラッグして マットをずらせだぜ☆<br/>そして左上の端を見ろ☆');

        gMainProgram.forwardScene('positioning', 'frameOnTimer');
    },
    frameOnTimer: () => {},
    onclickPositioningFinishButton: (event) => {
        "use strict";
        // Positioning finish button.
        let thisBtn = document.getElementById(event.target.id);
        thisBtn.style.display = "none";

        // Game scene elements.
        document.querySelectorAll('.game-scene').forEach((gameSceneElm) => {
            gameSceneElm.style.display = "block";
        });

        let iPlyr;
        // Score elements is visible/hidden.
        iPlyr = 0;
        document.querySelectorAll('.score').forEach((scoreElm) => {
            if (iPlyr < G.entryPlayerNum) {
                scoreElm.style.display = 'block';
            } else {
                scoreElm.style.display = 'none';
            }
            iPlyr += 1;
        });

        // Total-container elements is visible/hidden.
        iPlyr = 0;
        document.querySelectorAll('.total-container').forEach((totalCntElm) => {
            if (iPlyr < G.entryPlayerNum) {
                totalCntElm.style.display = 'block';
            } else {
                totalCntElm.style.display = 'none';
            }
            iPlyr += 1;
        });

        // Tile positioning.
        gPositioningScene.executeAutoTilePosition();

        gMainProgram.forwardScene('game', 'initOnTimer');
    },
    executeAutoTilePosition: () => {
        "use strict";
        let usedTileCount = 0;

        // Player mats.
        for (let iPlyr = 0; iPlyr < G.entryPlayerNum; iPlyr += 1) {
            let elmMat = document.getElementById('mat' + iPlyr);

            for (let kTileN = 0; kTileN < G.tileNumByPlayer; kTileN += 1) {
                let elmTile = document.getElementById('tile' + G.tileNumbers[usedTileCount]);
                elmTile.style.left = (parseInt(elmMat.style.left, 10) + kTileN % (G.tileNumByPlayer / 2) * 32 + 20) + 'px';
                elmTile.style.top = (parseInt(elmMat.style.top, 10) + (Math.floor(kTileN / (G.tileNumByPlayer / 2)) * 64) + 20) + 'px';
                elmTile.style.border = "solid 2px " + elmMat.style.borderColor;
                elmTile.style.display = "block";
                usedTileCount += 1;
            }
        }

        // Library. Turn tile to back.
        let elmMatLib = document.getElementById('mat' + LIBRARY_MAT_INDEX);
        let m = 0;
        for (; usedTileCount < G.tileNumbers.length; usedTileCount += 1) {
            let elmTile = document.getElementById('tile' + G.tileNumbers[usedTileCount]);
            elmTile.style.left = (parseInt(elmMatLib.style.left, 10) + m * 32 + 20) + 'px';
            elmTile.style.top = (parseInt(elmMatLib.style.top, 10) + 20) + 'px';
            elmTile.style.display = 'block';
            gViewHelper.turnTileToBack(elmTile);
            m += 1;
        }
    }
};
