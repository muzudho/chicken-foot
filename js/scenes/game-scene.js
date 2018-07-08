/**
 * Game scene.
 * @authore Muzudho
 * @module js/scenes/game-scene
 */

var gGameScene = {
    phase: 'searchDoubleNumber',
    initOnTimer: function () {
        "use strict";
        // Set up next player button.
        let nextPlayerBtn = document.getElementById('nextPlayerButton');
        nextPlayerBtn.onclick = function (event) {
            gModelHelper.turnToNextPlayer();
        };

        // Set up round end button.
        let roundEndBtn = document.getElementById('roundEndButton');
        roundEndBtn.onclick = function (event) {
            gRuleHelper.refreshScoreByAllMats();
            gViewHelper.updateTotalBasedOnMat();
        };

        G.currentPlayer = gRuleHelper.getFirstPlayerIndex();
        gRuleHelper.highlightPlayer(G.currentPlayer);
        console.log('initOnTimer: 99 have? ' + gModelHelper.containsTileNumberByPlayer(99, G.currentPlayer));

        gMainProgram.forwardScene('game', 'frameOnTimer');
    },
    frameOnTimer: function () {
        "use strict";
        switch (gGameScene.phase) {
        case 'searchDoubleNumber':
            // Have current player double number? ex) 99, 88, 77...
            console.log('99 have? ' + gModelHelper.containsTileNumberByPlayer(99, G.currentPlayer));
            if (gModelHelper.containsTileNumberByPlayer(99, G.currentPlayer)) {
                gGameScene.phase = 'onGame';
            } else {
                if (G.matThetaRankArr[G.currentPlayer] === G.entryPlayerNum - 1) {
                    // TODO 山札から全プレイヤーに１枚ずつ配りたい。

                    for (let iPlyr = 0; iPlyr < G.entryPlayerNum; iPlyr += 1) {
                        // 山札から１枚取る。
                        let tileNum = gModelHelper.popLibrary();
                        if (typeof tileNum !== 'undefined') {
                            // 山札の最後尾札を、プレイヤーのマットへ移動。
                        } else {
                            // 山札が無くなっていれば終わり。
                            break;
                        }
                    }
                }
                // Search next player.
                gModelHelper.turnToNextPlayer();
            }
            break;
        case 'onGame':
        }
    }
};
