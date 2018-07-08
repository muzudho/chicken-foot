/**
 * Search view. And result to model.
 * @authore Muzudho
 * @module js/view-helper.js
 */

var gViewHelper = {
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
