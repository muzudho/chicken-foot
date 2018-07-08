/**
 * Game rule helper.
 * @authore Muzudho
 * @module js/rule-helper
 */

var gRuleHelper = {
    /** Refresh all presentable scores. */
    refreshScoreByAllMats: function () {
        "use strict";
        gViewHelper.selectHandTailsByPlayer();
        gModelHelper.selectScoreByPlayer();
    },

    /**
     * Angle が1番小さいもの
     * 参考: https://goma.pw/article/2017-01-31-0/ |2017-01-31「JS：Array内の数値の順位を求める」
     */
    getFirstPlayerIndex: function () {
        "use strict";
        return G.matThetaRankArr.indexOf(0);
    },

    highlightPlayer: function (highlightPlyr) {
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
