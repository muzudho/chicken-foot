/**
 * Intersect on sprite.
 * @authore Muzudho
 * @module js/intersect
 */

var gIntersect = {
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
    getRight: (element) => {
        "use strict";
        return parseInt(element.style.left, 10) + parseInt(element.style.width, 10);
    },

    /**
     * @example
     * Bottom is
     * +-Char------+
     * |           |
     * |           |
     * |           |
     * +-----------+ &lt;--this.
     */
    getBottom: (element) => {
        "use strict";
        return parseInt(element.style.top, 10) + parseInt(element.style.height, 10);
    },

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
    isIntersect: (elmChar, elmStage) => {
        "use strict";
        return parseInt(elmStage.style.left, 10) <= parseInt(elmChar.style.left, 10) &&
        parseInt(elmStage.style.top, 10) <= parseInt(elmChar.style.top, 10) &&
        gIntersect.getRight(elmChar) <= gIntersect.getRight(elmStage) &&
        gIntersect.getBottom(elmChar) <= gIntersect.getBottom(elmStage);
    }
};
