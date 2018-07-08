/**
 * Debug utility.
 * @authore Muzudho
 * @module js/debug-helper.js
 */

var gDebugHelper = {
    showHandList: function () {
        "use strict";
        for (let iPlyr = 0; iPlyr < PLYR_MAX_LEN; iPlyr += 1) {
            let numberArr = [];
            for (let iTile = 0; iTile < G.handList[iPlyr].length; iTile += 1) {
                numberArr.push(G.handList[iPlyr][iTile]);
            }

            console.log('[' + iPlyr + '] ' + numberArr.join(','));
        }
    }
};
