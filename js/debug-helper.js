/**
 * Debug utility.
 * @authore Muzudho
 * @module js/debug-helper.js
 */

var gDebugHelper = {
    showHandList: () => {
        "use strict";
        for (let iPlyr = 0; iPlyr < PLYR_MAX_LEN; iPlyr += 1) {
            let numberArr = [];
            for (let iTile = 0; iTile < G.playerList[iPlyr].handList.length; iTile += 1) {
                numberArr.push(G.playerList[iPlyr].handList[iTile]);
            }

            console.log('[' + iPlyr + '] ' + numberArr.join(','));
        }
    }
};
