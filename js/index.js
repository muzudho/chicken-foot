/**
 * Chicken foot.
 * @module js/index
 */
/*jslint es6 */

var gIndex = {
    /**
     * Shuffles array in place. ES6 version
     * @param {Array} a items An array containing the items.
     * {@Link https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array |2011-06-08 How can I shuffle an array?}
     */
    shuffle: (a) => {
        "use strict";
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    },

    onResize: () => {
        "use strict";
        // root pibot
        let elmMatRP = document.getElementById('mat'+ROUTE_PIBOT_MAT_INDEX);
        elmMatRP.style.left = (window.innerWidth / 2 + 32) + "px";
        elmMatRP.style.top = (window.innerHeight / 2 + 132) + "px";
    }
};
