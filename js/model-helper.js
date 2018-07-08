/**
 * Search model. And result to model. Nothing view.
 * @authore Muzudho
 * @module js/model-helper
 */

var gModelHelper = {
    /** Initialize global variable. */
    initialize: function () {
        G = {
            /** 0 <= x < 360. */
            angleDegByTile: [],

            /** -1 is nobody. This is player id. */
            currentPlayer: -1,

            entryPlayerNum: 0,

            /** Tile numbers by player. */
            handList: [],

            /** radius */
            matThetaArr: [],
            /** Index is player id. */
            matThetaRankArr: [],

            /** mouse-drag.js */
            mouseDrag: {
                startClient: {
                    x: 0,
                    y: 0
                },
                holdPoint: {
                    x: 0,
                    y: 0
                }
            },

            scene: "#main-program",
            scoreByMat: [],

            tileNumbers: [],
            tileNumByPlayer: 0,

            z: "" // nothing comma
        };

        // 配列に 存在するタイルの数字を入れる。
        let k = 0;
        for (let j = 0; j < 10; j += 1) {
            for (let i = 0; i < 10; i += 1) {
                if (i <= j) {
                    G.tileNumbers[k] = 10 * i + j;
                    k += 1;
                } else {
                    break;
                }
            }
        }
    },
    selectScoreByPlayer: function () {
        for (let iPlyr = 0; iPlyr < PLYR_MAX_LEN; iPlyr += 1) {
            // Clear model.
            G.scoreByMat[iPlyr] = 0;
            for (let iTile = 0; iTile < G.handList[iPlyr].length; iTile += 1) {
                let tileNum = G.handList[iPlyr][iTile];
                // Setup model.
                if (tileNum === 0) {
                    // ダブル ブランクの失点は 50点。
                    G.scoreByMat[iPlyr] -= 50;
                } else {
                    // 1桁目、2桁目を 1桁の数字として計算。
                    G.scoreByMat[iPlyr] -= Math.floor(tileNum / 10) % 10 + tileNum % 10;
                }
            }
        }
    },
    turnToNextPlayer: function () {
        let rank = G.matThetaRankArr[G.currentPlayer];
        if (rank < 1) {
            rank = G.entryPlayerNum - 1;
        } else {
            rank -= 1;
        }
        G.currentPlayer = G.matThetaRankArr.indexOf(rank);
    }
};
