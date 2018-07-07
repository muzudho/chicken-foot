/**
 * Dynamic style.
 * @authore muzudho
 * @module js/dynamic-style
 */

const BODY_PADDING_TOP = 5 * 40;

const DYNAMIC_STYLE_MAT_COLOR = [
    '#3C77B9',
    '#20762F',
    '#C3273D',
    '#5E2D26',
    '#204CB9',
    '#F49B3F',
    '#D8768F',
    '#89A58C',
    '#020001', // stack
    '#0080FF' // root pibot
];

function loadDynamicStyleMove(suffix) {
    "use strict";
    let elmMove = document.getElementById('move' + suffix);
    elmMove.style.left = 0 + 'px';
    elmMove.style.top = BODY_PADDING_TOP + 'px';
    elmMove.style.width = 36 + 'px';
    elmMove.style.height = 36 + 'px';
    switch (suffix) {
    case 'Lib':
        elmMove.style.color = DYNAMIC_STYLE_MAT_COLOR[STACK_INDEX];
        break;
    case 'RP':
        elmMove.style.color = DYNAMIC_STYLE_MAT_COLOR[ROUTE_PIBOT_INDEX];
        break;
    default:
        elmMove.style.color = DYNAMIC_STYLE_MAT_COLOR[suffix];
    }
}

function loadDynamicStyleScore(suffix) {
    "use strict";
    let elmScore = document.getElementById('score' + suffix);
    elmScore.style.left = 0 + 'px';
    elmScore.style.top = BODY_PADDING_TOP + 'px';
    elmScore.style.width = 300 + 'px';
    elmScore.style.height = 54 + 'px';
    elmScore.style.color = DYNAMIC_STYLE_MAT_COLOR[suffix];
}

function loadDynamicStyleMat(suffix) {
    let elmMat = document.getElementById('mat' + suffix);
    elmMat.style.left = Math.floor(Math.random() * 600 + BODY_PADDING_TOP) + 'px';
    elmMat.style.top = Math.floor(Math.random() * 400 + BODY_PADDING_TOP) + 'px';
    switch (suffix) {
    case 'Lib':
        // stack.
        elmMat.style.left = 400 + 'px';
        elmMat.style.top = BODY_PADDING_TOP + 'px';
        elmMat.style.borderColor = DYNAMIC_STYLE_MAT_COLOR[STACK_INDEX];
        break;
    case 'RP':
        // root pibot.
        elmMat.style.left = (window.innerWidth / 2 + 32) + 'px';
        elmMat.style.top = (window.innerHeight / 2 + 132) + 'px';
        elmMat.style.borderColor = DYNAMIC_STYLE_MAT_COLOR[ROUTE_PIBOT_INDEX];
        break;
    default:
        elmMat.style.width = 300 + 'px';
        elmMat.style.height = 100 + 'px';
        elmMat.style.borderColor = DYNAMIC_STYLE_MAT_COLOR[suffix];
    }
}

function getMatCenter(plyrNum) {}

function loadDynamicStylePlayerIcon(suffix) {
    let elmPlayerIcon = document.getElementById('playerIcon' + suffix);
    elmPlayerIcon.style.color = DYNAMIC_STYLE_MAT_COLOR[suffix];
}

function loadDynamicStyle() {
    "use strict";

    // Moves.
    for (let iPlyr = 0; iPlyr < 8; iPlyr += 1) {
        loadDynamicStyleMove(iPlyr);
    }
    loadDynamicStyleMove('Lib');
    loadDynamicStyleMove('RP');

    // Scores.
    for (let iPlyr = 0; iPlyr < 8; iPlyr += 1) {
        loadDynamicStyleScore(iPlyr);
    }

    // Mats.
    for (let iPlyr = 0; iPlyr < 8; iPlyr += 1) {
        loadDynamicStyleMat(iPlyr);
    }
    loadDynamicStyleMat('Lib');
    loadDynamicStyleMat('RP');

    // Player icons.
    for (let iPlyr = 0; iPlyr < 8; iPlyr += 1) {
        loadDynamicStylePlayerIcon(iPlyr);
    }

    // Tiles.
    for (let iTile = 0; iTile < G.tileNumbers.length; iTile += 1) {
        let elmTile = document.getElementById('tile' + G.tileNumbers[iTile]);
        //if (elmTile !== null) {
        // 初期位置
        elmTile.style.left = Math.floor(Math.random() * 600 + BODY_PADDING_TOP) + 'px';
        elmTile.style.top = Math.floor(Math.random() * 400 + BODY_PADDING_TOP) + 'px';
        elmTile.style.width = 32 + 'px';
        elmTile.style.height = 64 + 'px';
        //}
    }

}
