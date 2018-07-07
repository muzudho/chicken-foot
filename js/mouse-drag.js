/**
 * Mouse drag hold on sprite.
 * @authore muzudho
 * @module js/mouse-drag
 */

var gMouseDrag = {
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
     */
    onDragStart: function (event) {
        "use strict";
        let rectBody = document.body.getBoundingClientRect();
        G.mouseDrag.startClient.x = event.clientX;
        G.mouseDrag.startClient.y = event.clientY;
        // parseInt remove 'px'.
        G.mouseDrag.holdPoint.x = event.clientX - parseInt(event.target.style.left, 10) - rectBody.left;
        G.mouseDrag.holdPoint.y = event.clientY - parseInt(event.target.style.top, 10) - rectBody.top;
    },

    /**
     * Hold tile and mouse drag.
     */
    onTileDrag: function (event) {
        "use strict";
        if (!(event.clientX === 0 && event.clientY === 0)) { // except (0,0) of end of drag.
            let elmTile = event.target;
            let rectBodyClient = document.body.getBoundingClientRect();
            elmTile.style.left = (event.clientX - rectBodyClient.left - G.mouseDrag.holdPoint.x) + 'px';
            elmTile.style.top = (event.clientY - rectBodyClient.top - G.mouseDrag.holdPoint.y) + 'px';

            // Full intersect mat.
            //
            // +-Mat--------+
            // |            |
            // | +-Tile---+ |
            // | |        | |
            // | |        | |
            // | +--------+ |
            // +------------+
            elmTile.style.border = '';

            let elmMatLib = document.getElementById('matLib');
            if (isIntersect(event.target, elmMatLib)) {

                elmTile.src = getTilePath('empty');

            } else {

                elmTile.src = getTilePath(getNumberByTileId(event.target.id));

                for (let iPlyr = 0; iPlyr < PLYR_MAX_LEN; iPlyr += 1) {
                    let elmMat = document.getElementById('mat' + iPlyr);
                    if (isIntersect(elmTile, elmMat)) {
                        elmTile.style.border = "solid 2px " + elmMat.style.borderColor;
                    }
                }
            }
        }
    },

    moveDragMoveIcon: function (event, suffix) {
        "use strict";
        let deltaX = event.clientX - G.mouseDrag.startClient.x;
        let deltaY = event.clientY - G.mouseDrag.startClient.y;
        G.mouseDrag.startClient.x = event.clientX;
        G.mouseDrag.startClient.y = event.clientY;

        // Move icon.
        let rectBodyClient = document.body.getBoundingClientRect();
        event.target.style.left = (event.clientX - rectBodyClient.left - G.mouseDrag.holdPoint.x) + 'px';
        event.target.style.top = (event.clientY - rectBodyClient.top - G.mouseDrag.holdPoint.y) + 'px';

        let elmMat = document.getElementById('mat' + suffix);

        // Move member tiles.
        for (let iTile = 0; iTile < G.tileNumbers.length; iTile += 1) {
            let elmTile = document.getElementById('tile' + G.tileNumbers[iTile]);
            switch (suffix) {
            case 'RP':
                let isLocked = false;
                let elmMatLib = document.getElementById('matLib');
                if (isIntersect(elmTile, elmMatLib)) {
                    isLocked = true;
                } else {
                    for (let iOther = 0; iOther < PLYR_MAX_LEN; iOther += 1) {
                        let elmOthreMat = document.getElementById('mat' + iOther);
                        if (isIntersect(elmTile, elmOthreMat)) {
                            isLocked = true;
                            break;
                        }
                    }
                }
                if (!isLocked) {
                    elmTile.style.left = parseInt(elmTile.style.left, 10) + deltaX + 'px';
                    elmTile.style.top = parseInt(elmTile.style.top, 10) + deltaY + 'px';
                }
                break;
            default:
                if (isIntersect(elmTile, elmMat)) {
                    elmTile.style.left = parseInt(elmTile.style.left, 10) + deltaX + 'px';
                    elmTile.style.top = parseInt(elmTile.style.top, 10) + deltaY + 'px';
                }
                break;
            }
        }

        // Move mat.
        elmMat.style.left = parseInt(elmMat.style.left, 10) + deltaX + 'px';
        elmMat.style.top = parseInt(elmMat.style.top, 10) + deltaY + 'px';

        // Move score.
        switch (suffix) {
        case 'Lib':
            break;
        case 'RP':
            break;
        default:
            let elmScore = document.getElementById('score' + suffix);
            elmScore.style.left = parseInt(elmScore.style.left, 10) + deltaX + 'px';
            elmScore.style.top = parseInt(elmScore.style.top, 10) + deltaY + 'px';
        }
    },

    /**
     * Hold move icon and drag.
     */
    onDragMoveIcon: function (event) {
        "use strict";
        if (!(event.clientX === 0 && event.clientY === 0)) { // except (0,0) of end of drag.
            let suffix = getSuffixByMoveId(event.target.id);
            if (suffix !== null) {
                this.moveDragMoveIcon(event, suffix);
            }
        }
    }
};
