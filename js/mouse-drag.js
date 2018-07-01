/**
 * Mouse drag hold on sprite.
 * @authore muzudho
 * @module js/mouse-drag.js
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
    let rectBody = document.body.getBoundingClientRect();
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
    if (!(event.clientX === 0 && event.clientY === 0)) { // except (0,0) of end of drag.
        let rectBodyClient = document.body.getBoundingClientRect();
        event.target.style.left = (event.clientX - rectBodyClient.left - G.mouseDrag.holdPoint.x) + 'px';
        event.target.style.top = (event.clientY - rectBodyClient.top - G.mouseDrag.holdPoint.y) + 'px';
    }
}
