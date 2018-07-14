/**
 * Controller. Main loop. Timer pseudo thread.
 * @authore muzudho
 * @module js/main-program
 */

/** Player 0,1,2,3,4,5,6,7. */
const PLYR_MAX_LEN = 8;
/** Library is player 8. */
const LIBRARY_MAT_INDEX = 8;
/** Not player and library space is 9. */
const ROUTE_PIBOT_MAT_INDEX = 9;
const TILE_SIZE = 100;

/** Global variables. */
G = {};

var gMainProgram = {
    forwardScene: (scene, phase) => {
        "use strict";
        G.scene = scene;
        G.scenePhase = phase;
    },
    initialize: () => {
        "use strict";

        // Initialize model. Such as global valiables.
        gModelHelper.initialize();

        gDynamicStyle.loadDynamicStyleAll();

        gMainProgram.forwardScene('title', 'initOnTimer');
    },
    onFrame: () => {
        "use strict";
        let scene;
        switch (G.scene) {
        case 'title':
            scene = gTitleScene;
            break;
        case 'positioning':
            scene = gPositioningScene;
            break;
        case 'game':
            scene = gGameScene;
            break;
        default:
            scene = null;
        }

        switch (G.scenePhase) {
        case 'initOnTimer':
            scene.initOnTimer();
            break;
        case 'frameOnTimer':
            scene.frameOnTimer();
        }

        gRuleHelper.refreshScoreByAllMats();

        let elmRP = document.getElementById('mat' + ROUTE_PIBOT_MAT_INDEX);
        let rpCenter = gDynamicStyle.getMatCenter(ROUTE_PIBOT_MAT_INDEX);

        // Mats.
        for (let iPlyr = 0; iPlyr < PLYR_MAX_LEN; iPlyr += 1) {
            if (iPlyr < G.entryPlayerNum) {
                // Angle.
                let elmMat = document.getElementById('mat' + iPlyr);
                let matCenter = gDynamicStyle.getMatCenter(iPlyr);
                // theta = atan2( y, x)
                G.matThetaArr[iPlyr] = Math.atan2(matCenter.y - rpCenter.y, matCenter.x - rpCenter.x);

                // Score.
                let elmScore = document.getElementById('score' + iPlyr);
                elmScore.innerHTML = G.scoreByMat[iPlyr] + '点';
            } else {
                // 小さいもの順ソートの邪魔にならないようにする。
                G.matThetaArr[iPlyr] = Number.MAX_VALUE;
            }
        }

        // 小さい順に並べる。
        let sorted = G.matThetaArr.slice().sort((a, b) => {
                return a - b
            });
        // 一番小さいものに 0、二番目に小さいものに 1、と付く。 FIXME: 同着は被ってしまう。
        G.matThetaRankArr = G.matThetaArr.slice().map((x) => {
                return sorted.indexOf(x)
            });

        /*
        // For debug.
        console.log('root pibot x: '+rpCenter.x+' y: '+rpCenter.y);
        for (let iPlyr = 0; iPlyr < PLYR_MAX_LEN; iPlyr += 1) {
        let matCenter = gDynamicStyle.getMatCenter(iPlyr);
        console.log('['+iPlyr+'] ('+matCenter.x+', '+matCenter.y+') theta: '+G.matThetaArr[iPlyr]+' rank: '+G.matThetaRankArr[iPlyr]);
        }
         */

        // Current player.
        if (G.currentPlayer !== -1) {
            gRuleHelper.highlightPlayer(G.currentPlayer);
        }
    }
};
