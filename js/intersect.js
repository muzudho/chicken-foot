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
    getRight: function (element) {
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
    getBottom: function (element) {
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
    isIntersect: function (elmChar, elmStage) {
        "use strict";
        return parseInt(elmStage.style.left, 10) <= parseInt(elmChar.style.left, 10) &&
        parseInt(elmStage.style.top, 10) <= parseInt(elmChar.style.top, 10) &&
        this.getRight(elmChar) <= this.getRight(elmStage) &&
        this.getBottom(elmChar) <= this.getBottom(elmStage);
    }
};
