/**
 * String format.
 * @authore muzudho
 * @module js/string-format
 */

const IMG_DIR = 'http://game.warabenture.com/chicken-foot/img/';

function getTilePath(tileNumber) {
    "use strict";
    return IMG_DIR + tileNumber + '.png';
}

/**
 * @returns {string} string or null.
 * @example
 * ### ex.
 * 'playerNum1' ---> '1'.
 * ### ex.
 * 'mat1' ---> null.
 */
function getNumberByEntryPlayerButtonId(id) {
    "use strict";
    let group = /^playerNum(.+)$/.exec(id);
    if (group !== null) {
        return parseInt(group[1], 10);
    }
    return null;
}

/**
 * @returns {string} string or null.
 * @example
 * ### ex.
 * 'tile1' ---> '1'.
 * ### ex.
 * 'mat1' ---> null.
 */
function getNumberByTileId(id) {
    "use strict";
    let group = /^tile(.+)$/.exec(id);
    if (group !== null) {
        return parseInt(group[1], 10);
    }
    return null;
}

/**
 * @returns {string} string or null.
 * @example
 * ### ex.
 * 'move1' ---> '1'.
 * ### ex.
 * 'tail1' ---> null.
 */
function getSuffixByMoveId(id) {
    "use strict";
    let group = /^move(.+)$/.exec(id);
    if (group !== null) {
        return group[1];
    }
    return null;
}
