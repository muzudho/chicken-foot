/**
 * Start up.
 * @authore muzudho
 * @module js/scenes/title-scene
 */

var gTitleScene = {
    startupMove: function (suffix) {
        "use strict";
        let elmMove = document.getElementById('move' + suffix);
        elmMove.draggable = true;
        elmMove.ondragstart = onDragStart;
        elmMove.ondrag = onDragMoveIcon;
    },
    initialize: function () {
        "use strict";
        // Moves.
        for (let iMat = 0; iMat < PLYR_MAX_LEN; iMat += 1) {
            this.startupMove(iMat);
        }
        this.startupMove('Lib');
        this.startupMove('RP');
    },
    startMove: function startMove(suffix) {
        "use strict";
        let elmMat = document.getElementById('mat' + suffix);
        let elmMove = document.getElementById('move' + suffix);
        elmMove.style.left = (parseInt(elmMat.style.left, 10) - 36) + 'px';
        elmMove.style.top = elmMat.style.top;
    },
    executeAutoPosition: function () {
        "use strict";
        // Visibility.
        let iPlyr = 0;
        for (; iPlyr < PLYR_MAX_LEN; iPlyr += 1) {
            let elmMat = document.getElementById('mat' + iPlyr);
            let elmScore = document.getElementById('score' + iPlyr);
            if (iPlyr < G.entryPlayerNum) {
                elmMat.style.display = "block";
            } else {
                elmMat.style.display = "none";
                elmMat.style.width = 0;
                elmMat.style.height = 0;
            }
        }

        // root pibot, mat, score, move icon.
        let elmMatRP = document.getElementById('matRP');
        let usedTileCount = 0;
        let radius = Math.min(window.innerWidth, window.innerHeight) / 2 * 0.7;
        for (iPlyr = 0; iPlyr < G.entryPlayerNum; iPlyr += 1) {
            let elmMat = document.getElementById('mat' + iPlyr);
            let elmScore = document.getElementById('score' + iPlyr);

            elmMat.style.width = ((G.tileNumByPlayer / 2 + 1.5) * 32) + 'px';
            elmMat.style.height = (2 * 64 + 32 * 1.25) + 'px';

            let theta = iPlyr / G.entryPlayerNum * 2 * Math.PI;
            elmMat.style.left = radius * Math.cos(theta) + (parseInt(elmMatRP.style.left, 10) + 64 / 2) - parseInt(elmMat.style.width, 10) / 2 + 'px';
            elmMat.style.top = radius * Math.sin(theta) + (parseInt(elmMatRP.style.top, 10) + 64 / 2) - parseInt(elmMat.style.height, 10) / 2 + 'px';

            elmScore.style.left = elmMat.style.left;
            elmScore.style.top = (parseInt(elmMat.style.top, 10) - 60) + 'px';

            gTitleScene.startMove(iPlyr);
        }
        gTitleScene.startMove('Lib');
        gTitleScene.startMove('RP');

        // Library
        let elmMatLib = document.getElementById('matLib');
        elmMatLib.style.width = ((55 - G.entryPlayerNum * G.tileNumByPlayer + 1.5) * 32) + 'px';
        elmMatLib.style.height = (64 + 32 * 1.25) + 'px';
    },
    onEntryPlayerCountButtonMouseOver: function (event) {
        "use strict";
        let id = event.target.id;
        // ex) playerNum1 button
        G.entryPlayerNum = parseInt(id.slice(9, 10), 10);

        this.executeAutoPosition();
    },
    onclickPlyrBtn: function (event) {
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

        this.executeAutoPosition();

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
        document.getElementById('moveLib').style.display = 'block';
        document.getElementById('moveRP').style.display = 'block';

        // Mats.
        document.getElementById('matLib').style.display = 'block';
        document.getElementById('matRP').style.display = 'block';
    }
}
