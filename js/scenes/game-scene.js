/**
 * Game scene.
 * @authore Muzudho
 * @module js/scenes/game-scene
 */

var gGameScene = {
    phase: 'searchDoubleNumber',
    initOnTimer: () => {
        "use strict";
        // Set up next player button.
        let nextPlayerBtn = document.getElementById('nextPlayerButton');
        nextPlayerBtn.onclick = (event) => {
            gModelHelper.turnToNextPlayer();
        };

        // Set up round end button.
        let roundEndBtn = document.getElementById('roundEndButton');
        roundEndBtn.onclick = (event) => {
            gRuleHelper.refreshScoreByAllMats();
            gViewHelper.updateTotalBasedOnMat();
        };

        G.currentPlayer = gRuleHelper.getFirstPlayerIndex();
        gRuleHelper.highlightPlayer(G.currentPlayer);

        gMainProgram.forwardScene('game', 'frameOnTimer');
    },
    frameOnTimer: () => {
        "use strict";
        switch (gGameScene.phase) {
        case 'searchDoubleNumber':
            // Have current player double number? ex) 99, 88, 77...
            gTalkHelper.talk('誰が 99 を持ってるんだぜ☆？<br/>探すからな☆');
            if (gModelHelper.containsTileNumberByPlayer(99, G.currentPlayer)) {
                gTalkHelper.talk('99を持っていたか☆ じゃあ その99を<br/>青い十字マークの近くのとこまで ずらせだぜ☆');
                gGameScene.phase = 'initOnPutTile';
            } else {
                // ex) 4人なら、angleの小さな順 0位,3位,2位,1位 に進む。 1位 が ダブルを持っていなければ、全員持っていない。
                if (G.matThetaRankArr[G.currentPlayer] === 1) {
                    // TODO 山札から全プレイヤーに１枚ずつ配りたい。
                    gTalkHelper.talk('なんだ、誰も 99 を持っていないのかだぜ☆');

                    for (let iPlyr = 0; iPlyr < G.entryPlayerNum; iPlyr += 1) {
                        // 山札から１枚取る。
                        let tileNum = gModelHelper.popLibrary();
                        if (typeof tileNum !== 'undefined') {
                            // 山札の最後尾札を、プレイヤーのマットへ移動。
                            gViewHelper.moveTileToMat(tileNum, iPlyr);
                            gModelHelper.moveTileToMat(tileNum, iPlyr);
                            gViewHelper.turnTileToFront(document.getElementById('tile' + tileNum));
                            gTalkHelper.talk(iPlyr + "プレイヤーは、山札から " + tileNum + " のタイルを取ったぜ☆");
                        } else {
                            // 山札が無くなっていれば終わり。
                            gTalkHelper.talk("山札が無くなっているので終わり☆");
                            gGameScene.phase = 'initOnPutTile';
                            break;
                        }
                    }
                }
                // Search next player.
                gModelHelper.turnToNextPlayer();
            }
            break;
        case 'initOnPutTile':
            // Copy array.
            G.handListAsTurnBegin = G.handList.slice();
            gGameScene.phase = 'frameOnPutTile';
            break;
        case 'frameOnPutTile':
            //if()
        }
    }
};
