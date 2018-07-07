/**
 * String format.
 * @authore muzudho
 * @module js/string-format
 */

/** ex) "playerNum1" button. */
function getNumberByEntryPlayerButtonId(id) {
    "use strict";
    return parseInt(id.slice(9, 10), 10);
}
/** ex) "tile1" element. */
function getNumberByTileId(id) {
    "use strict";
    return parseInt(id.slice(4, 5), 10);
}
