/**
 * Intersect on sprite.
 * @authore muzudho
 * @module js/intersect
 */

/**
 * @example
 * Right is
 * +-Char------+
 * |           |
 * |           |
 * |           |
 * +-----------+
 *             ^
 *             |
 *             this.
 */
function getRight(element){
    "use strict";
    return parseInt(element.style.left,10) + parseInt(element.style.width,10);
}

/**
 * @example
 * Bottom is
 * +-Char------+
 * |           |
 * |           |
 * |           |
 * +-----------+ &lt;--this.
 */
function getBottom(element){
    "use strict";
    return parseInt(element.style.top,10) + parseInt(element.style.height,10);
}

/**
 * @example
 * Intersect is
 * +-Stage----------+
 * |                |
 * |  +-Char------+ |
 * |  |           | |
 * |  |           | |
 * |  |           | |
 * |  +-----------+ |
 * +----------------+
 */
function isIntersect( elmChar, elmStage ){
    "use strict";
    return parseInt(elmStage.style.left,10) <= parseInt(elmChar.style.left,10) &&
        parseInt(elmStage.style.top,10) <= parseInt(elmChar.style.top,10) &&
        getRight(elmChar) <= getRight(elmStage) &&
        getBottom(elmChar) <= getBottom(elmStage);
}
