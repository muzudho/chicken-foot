/**
 * Search model. And result to model. Nothing view.
 * @authore Muzudho
 * @module js/model-helper
 */

var gModelHelper = {
    /** Initialize global variable. */
    initialize: () => {
        "use strict";
        G = {
            /** -1 is nobody. This is player id. */
            currentPlayer: -1,

            entryPlayerNum: 0,

            /** Tile numbers by player. */
            handList: [],
            handListAsTurnBegin: [],

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

            /**
             * By player, library, root pibot.
             * { score:n }
             */
            playerList: [],
            
            scene: "#main-program",
            scenePhase: "#initialize",

            /**
             * tileList[tileNumber]
             * { mat:n, preMat:n angleDeg:n }
             */
            tileList: [],

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

        // タイル リスト作成。存在しない番号も入れて、[0]～[99]連番の配列として作成。
        for (let iTileNumber = 0; iTileNumber < TILE_SIZE; iTileNumber += 1) {
            if (-1 === G.tileNumbers.indexOf(iTileNumber)) {
                // 存在しないタイル番号
                G.tileList[iTileNumber] = {};
            } else {
                // 存在するタイル番号
                G.tileList[iTileNumber] = {
                    mat: 0,
                    preMat: 0,

                    /** 0 <= x < 360. */
                    angleDeg: 0
                };
            }
        }
        
        // プレイヤー リストの作成。
        for (let iPlyr = 0; iPlyr < ROUTE_PIBOT_MAT_INDEX+1; iPlyr += 1) {
            G.playerList[iPlyr] = {
                score: 0
            };
        }
    },
    containsTileNumberByPlayer: (tileNum, plyrNum) => {
        "use strict";
        return G.handList[plyrNum].indexOf(tileNum) !== -1;
    },
    selectScoreByPlayer: () => {
        "use strict";
        for (let iPlyr = 0; iPlyr < PLYR_MAX_LEN; iPlyr += 1) {
            // Clear model.
            G.playerList[iPlyr].score = 0;
            for (let iTile = 0; iTile < G.handList[iPlyr].length; iTile += 1) {
                let tileNum = G.handList[iPlyr][iTile];
                // Setup model.
                if (tileNum === 0) {
                    // ダブル ブランクの失点は 50点。
                    G.playerList[iPlyr].score -= 50;
                } else {
                    // 1桁目、2桁目を 1桁の数字として計算。
                    G.playerList[iPlyr].score -= Math.floor(tileNum / 10) % 10 + tileNum % 10;
                }
            }
        }
    },
    turnToNextPlayer: () => {
        "use strict";
        let rank = G.matThetaRankArr[G.currentPlayer];
        if (rank < 1) {
            rank = G.entryPlayerNum - 1;
        } else {
            rank -= 1;
        }
        G.currentPlayer = G.matThetaRankArr.indexOf(rank);
    },
    /**
     * @returns {number} tileNum or undefined.
     */
    popLibrary: () => {
        "use strict";
        return G.handList[LIBRARY_MAT_INDEX].pop();
    },
    /**
     * @returns {boolean} successful.
     */
    moveTileToMatImpl: (tileNum, srcPlyr, dstPlyr) => {
        "use strict";
        let index = G.handList[srcPlyr].indexOf(tileNum);
        if (typeof index !== 'undefined') {
            G.handList[srcPlyr].remove(tileNum);
            G.handList[dstPlyr].push(tileNum);
            return true;
        }
        return false;
    },
    /** TODO */
    moveTileToMat: (tileNum, dstPlyr) => {
        "use strict";
        for (let iPlyr = 0; iPlyr < PLYR_MAX_LEN; iPlyr += 1) {
            if (gModelHelper.moveTileToMatImpl(tileNum, iPlyr, dstPlyr)) {
                return;
            }
        }

        if (gModelHelper.moveTileToMatImpl(tileNum, LIBRARY_MAT_INDEX, dstPlyr)) {
            return;
        }

        if (gModelHelper.moveTileToMatImpl(tileNum, ROUTE_PIBOT_MAT_INDEX, dstPlyr)) {
            return;
        }
    }
};
