/**
 * Game scene.
 * @authore Muzudho
 * @module js/scenes/game-scene
 */

var gGameScene = {
    phase: 'searchRoot',
    initOnTimer: function () {
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
        switch (gGameScene.phase) {
        case 'searchRoot':
            // Have current player double number? ex) 99, 88, 77...
            console.log('99 have? ' + gModelHelper.containsTileNumberByPlayer(99, G.currentPlayer));
            if (gModelHelper.containsTileNumberByPlayer(99, G.currentPlayer)) {
                gGameScene.phase = 'onGame';
            } else {
                // Search next player.
                gModelHelper.turnToNextPlayer();
            }
            break;
        case 'onGame':
        }
    }
};
