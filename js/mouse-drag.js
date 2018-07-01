/**
 * Mouse drag hold on sprite.
 * @authore muzudho
 * @module js/mouse-drag
 */

/**
 * Required body{position: absolute, left: 0, top: 0}.
 * @example
 * +-Body----------------+ - Body absolute left:0, top:0. Client left:-3, top:-2.
 * |                     |
 * |  +-View-----------+ | - Standard left: 0, top: 0.
 * |  |                | |
 * |  |  +-Element---+ | | - event.target left: 6, top: 4. (Body origin)
 * |  |  |           | | |
 * |  |  |  x        | | | - Clicked point. event.clickX: 6, event.clickY: 4. (View origin)
 * |  |  |           | | |
 * |  |  +-----------+ | |
 * |  +----------------+ |
 * +---------------------+
 *
 * +-Element---+
 * |           |
 * |  x        | - Hold point. G.holdPoint{ x: 2, y: 2 }.
 * |           |
 * +-----------+
 *
 * Require global variables.
 * G = {
 *     mouseDrag: {
 *         startClient: {
 *             x: 0,
 *             y: 0
 *         },
 *         holdPoint: {
 *             x: 0,
 *             y: 0
 *         }
 *     }
 * };
 *
 * document.getElementById(id).ondragstart = onDragStart;
 */
function onDragStart(event) {
    "use strict";
    let rectBody = document.body.getBoundingClientRect();
    G.mouseDrag.startClient.x = event.clientX;
    G.mouseDrag.startClient.y = event.clientY;
    // parseInt remove 'px'.
    G.mouseDrag.holdPoint.x = event.clientX - parseInt(event.target.style.left, 10) - rectBody.left;
    G.mouseDrag.holdPoint.y = event.clientY - parseInt(event.target.style.top, 10) - rectBody.top;
}

/**
 * Hold sprite and drag.
 *
 * document.getElementById(id).ondrag = onDrag;
 */
function onDrag(event) {
    "use strict";
    if (!(event.clientX === 0 && event.clientY === 0)) { // except (0,0) of end of drag.
        let rectBodyClient = document.body.getBoundingClientRect();
        event.target.style.left = (event.clientX - rectBodyClient.left - G.mouseDrag.holdPoint.x) + 'px';
        event.target.style.top = (event.clientY - rectBodyClient.top - G.mouseDrag.holdPoint.y) + 'px';

        // Full intersect decks.
        //
        // +-Deck-------+
        // |            |
        // | +-Tile---+ |
        // | |        | |
        // | |        | |
        // | +--------+ |
        // +------------+
        event.target.style.border = '';
        for (let iDeck = 0; iDeck < 8; iDeck += 1) {
            let elmDeck = document.getElementById('deck' + iDeck);
            if (isIntersect(event.target, elmDeck)) {
                event.target.style.border = "solid 2px " + elmDeck.style.borderColor;
            }
        }
    }
}

/**
 * Hold move icon and drag.
 *
 * document.getElementById(id).ondrag = onDrag;
 */
function onDragMoveIcon(event) {
    "use strict";
    if (!(event.clientX === 0 && event.clientY === 0)) { // except (0,0) of end of drag.

        console.log('event.target.id = ' + event.target.id);
        let groupMove = /^move(\d+)$/.exec(event.target.id);
        if (groupMove !== null) {
            let moveNum = groupMove[1];

            let deltaX = event.clientX - G.mouseDrag.startClient.x;
            let deltaY = event.clientY - G.mouseDrag.startClient.y;
            G.mouseDrag.startClient.x = event.clientX;
            G.mouseDrag.startClient.y = event.clientY;

            // Move icon.
            let rectBodyClient = document.body.getBoundingClientRect();
            event.target.style.left = (event.clientX - rectBodyClient.left - G.mouseDrag.holdPoint.x) + 'px';
            event.target.style.top = (event.clientY - rectBodyClient.top - G.mouseDrag.holdPoint.y) + 'px';

            let elmDeck = document.getElementById('deck' + moveNum);

            // Move member tiles.
            for (let iTile = 0; iTile < G.tileNumbers.length; iTile += 1) {
                let elmTile = document.getElementById('tile' + G.tileNumbers[iTile]);
                if (isIntersect(elmTile, elmDeck)) {
                    elmTile.style.left = parseInt(elmTile.style.left, 10) + deltaX + 'px';
                    elmTile.style.top = parseInt(elmTile.style.top, 10) + deltaY + 'px';
                }
            }

            // Move deck.
            elmDeck.style.left = parseInt(elmDeck.style.left, 10) + deltaX + 'px';
            elmDeck.style.top = parseInt(elmDeck.style.top, 10) + deltaY + 'px';

            // Move score.
            let elmScore = document.getElementById('score' + moveNum);
            elmScore.style.left = parseInt(elmScore.style.left, 10) + deltaX + 'px';
            elmScore.style.top = parseInt(elmScore.style.top, 10) + deltaY + 'px';

        }
    }
}
