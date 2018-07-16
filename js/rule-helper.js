/**
 * Game rule helper.
 * @authore Muzudho
 * @module js/rule-helper
 */

var gRuleHelper = {
    /** Refresh all presentable scores. */
    refreshScoreByAllMats: () => {
        "use strict";
        gViewHelper.selectHandTailsByPlayer();
        gModelHelper.selectScoreByPlayer();
    },

    /**
     * Angle が1番小さいもの
     * 参考: https://goma.pw/article/2017-01-31-0/ |2017-01-31「JS：Array内の数値の順位を求める」
     */
    getFirstPlayerIndex: () => {
        "use strict";
        for (let iPlyr = 0; iPlyr < PLYR_MAX_LEN; iPlyr += 1) {
            if (G.playerList[iPlyr].matThetaRank === 0) {
                return iPlyr;
            }
        }
        return -1; // エラー
    },

    highlightPlayer: (highlightPlyr) => {
        "use strict";
        // Mat opacity.
        let iPlyr = 0;
        for (; iPlyr < PLYR_MAX_LEN; iPlyr += 1) {
            if (iPlyr != G.currentPlayer && iPlyr < G.entryPlayerNum) {
                gDynamicStyle.setMatToOpacityMax(iPlyr, true);
            } else {
                gDynamicStyle.setMatToOpacityMax(iPlyr, false);
            }
        }
        gDynamicStyle.setMatToOpacityMax(highlightPlyr, false);
    }
};
