/**
 * Search view. And result to model.
 * @authore Muzudho
 * @module js/view-helper.js
 */

var gViewHelper = {
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

            gTitleScene.layoutMove(iPlyr);
        }
        gTitleScene.layoutMove('Lib');
        gTitleScene.layoutMove('RP');

        // Library
        let elmMatLib = document.getElementById('matLib');
        elmMatLib.style.width = ((55 - G.entryPlayerNum * G.tileNumByPlayer + 1.5) * 32) + 'px';
        elmMatLib.style.height = (64 + 32 * 1.25) + 'px';
    },
    selectHandTailsByPlayerImpl: function (iPlyr, elmMat) {
        "use strict";
        // Search tile views.
        for (let iTile = 0; iTile < G.tileNumbers.length; iTile += 1) {
            let tileNum = G.tileNumbers[iTile];
            let elmTile = document.getElementById('tile' + tileNum);
            if (gIntersect.isIntersect(elmTile, elmMat)) {
                // Set up model.
                G.handList[iPlyr].push(tileNum);
            }
        }
    },
    selectHandTailsByPlayer: function () {
        "use strict";
        // Clear model.
        G.handList = [];

        // Search mat views.
        for (let iPlyr = 0; iPlyr < PLYR_MAX_LEN; iPlyr += 1) {
            // Clear model.
            G.handList[iPlyr] = [];
            let elmMat = document.getElementById('mat' + iPlyr);
            gViewHelper.selectHandTailsByPlayerImpl(iPlyr, elmMat);
        }
        // Library
        G.handList[LIBRARY_MAT_INDEX] = [];
        gViewHelper.selectHandTailsByPlayerImpl(LIBRARY_MAT_INDEX, document.getElementById('matLib'));

        // gDebugHelper.showHandList();
    },
    clearTotal: function () {
        "use strict";
        for (let iPlyr = 0; iPlyr < PLYR_MAX_LEN; iPlyr += 1) {
            let totalTbx = document.getElementById('total' + iPlyr);
            totalTbx.value = 0;
        }
    },
    /** Total score text boxes. */
    updateTotalBasedOnMat: function () {
        "use strict";
        for (let iPlyr = 0; iPlyr < PLYR_MAX_LEN; iPlyr += 1) {
            let elmTotal = document.getElementById('total' + iPlyr);
            elmTotal.value = parseInt(elmTotal.value, 10) + G.scoreByMat[iPlyr];
        }
    },
    moveTileToMat: function(tileNum, matSuffix){
        "use strict";
        let elmTile = document.getElementById('tile' + tileNum);
        let matCenter = gDynamicStyle.getMatCenter(matSuffix);
        elmTile.style.left = matCenter.x + 'px';
        elmTile.style.top = matCenter.y + 'px';
    },
    turnTileToBack: (elmTile)=>{
        "use strict";
        elmTile.src = gStringFormat.getTilePath('empty');
    },
    turnTileToFront: (elmTile)=>{
        "use strict";
        elmTile.src = gStringFormat.getTilePath(gStringFormat.getNumberByTileId(elmTile.id));
    }
};
