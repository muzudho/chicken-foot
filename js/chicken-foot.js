/**
 * Chicken foot.
 * @module js/chicken-foot
 */
/*jslint es6 */

/** Global variables. */
G = {
    /** 0 <= x < 360 */
    angleDeg: [],
    /** mouse-drag.js */
    mouseDrag: {
        holdPoint: {
            x: 0,
            y: 0
        }
    }
};

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 * {@Link https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array |2011-06-08 How can I shuffle an array?}
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function onResize(){
    let elmCenter = document.getElementById('center');
    elmCenter.style.left = (window.innerWidth / 2 + 32) + "px";
    elmCenter.style.top = (window.innerHeight / 2 + 32) + "px";
}

function onclickPlyrBtn(event) {
    let id = event.target.id;
    // playerNum1
    let iPlyrN = parseInt(id.slice(9, 10), 10);

    for (let jDeckN = 0; jDeckN < 8; jDeckN += 1) {
        let deckObj = document.getElementById('deck' + jDeckN);
        if (jDeckN < iPlyrN) {
            deckObj.style.display = "block";
        } else {
            deckObj.style.display = "none";
        }
    }

    // 配列に 存在するタイルの数字を入れる。
    let array = [];
    let k = 0;
    for (let j = 0; j < 10; j += 1) {
        for (let i = 0; i < 10; i += 1) {
            if (i <= j) {
                array[k] = 10 * i + j;
                k += 1;
            } else {
                break;
            }
        }
    }

    // シャッフル
    array = shuffle(array);

    let tileNum;
    switch (iPlyrN) {
    case 2:
        // 21枚ずつ
        tileNum = 21;
        break;
    case 3:
        // 14枚ずつ
        tileNum = 14;
        break;
    case 4:
        // 11枚ずつ
        tileNum = 11;
        break;
    case 5:
        // 8枚ずつ
        tileNum = 8;
        break;
    case 6:
        // 7枚ずつ
        tileNum = 7;
        break;
    case 7:
        // 6枚ずつ
        tileNum = 6;
        break;
    default:
    case 8:
        // 5枚ずつ
        tileNum = 5;
        break;
    }

    let elmCenter = document.getElementById('center');
    let lTile = 0;
    let radius = Math.min(window.innerWidth, window.innerHeight)/2 * 0.7;
    for (let jDeckN = 0; jDeckN < iPlyrN; jDeckN += 1) {
        let elmDeck = document.getElementById('deck' + jDeckN);
        elmDeck.style.width = ((tileNum/2 + 1.5) * 32) + "px";
        elmDeck.style.height = (2*64+32*1.25) + "px";
        
        let theta = jDeckN/iPlyrN * 2 * Math.PI;
        console.log( "jDeck("+jDeckN+"): theta="+theta );
        elmDeck.style.left = radius*Math.cos(theta) + (parseInt(elmCenter.style.left,10) + 64/2) - parseInt(elmDeck.style.width,10)/2 + "px";
        elmDeck.style.top = radius*Math.sin(theta) + (parseInt(elmCenter.style.top,10) + 64/2) - parseInt(elmDeck.style.height,10)/2 + "px";
        
        for (let kTileN = 0; kTileN < tileNum; kTileN += 1) {
            let elmTile = document.getElementById('tile' + array[lTile]);
            elmTile.style.left = (parseInt(elmDeck.style.left, 10) + kTileN%(tileNum/2) * 32 + 20) + 'px';
            elmTile.style.top = (parseInt(elmDeck.style.top, 10) + (Math.floor(kTileN/(tileNum/2))*64) + 20) + 'px';
            lTile += 1;
        }
    }

    let elmMountain = document.getElementById('mountain');
    elmMountain.style.width = ((55 - iPlyrN * tileNum + 1.5) * 32) + "px";
    let m = 0;
    for (; lTile < array.length; lTile += 1) {
        let elmTile = document.getElementById('tile' + array[lTile]);
        elmTile.style.left = (parseInt(elmMountain.style.left, 10) + m * 32 + 20) + 'px';
        elmTile.style.top = (parseInt(elmMountain.style.top, 10) + 20) + 'px';
        m += 1;
    }

}

function onLoad() {

    // Player number buttons.
    for (let iPlyrN = 2; iPlyrN < 9; iPlyrN += 1) {
        let plyrBtnId = 'playerNum' + iPlyrN;
        let plyrBtn = document.getElementById(plyrBtnId);
        /**
         * @param {number} playerNum - プレイヤー人数
         */
        plyrBtn.onclick = onclickPlyrBtn;
    }

    let mountainObj = document.getElementById('mountain');
    mountainObj.style.left = "400px";
    mountainObj.style.top = "40px";

    // Decks.
    for (let iDeck = 0; iDeck < 8; iDeck += 1) {
        let deckId = 'deck' + iDeck;
        let elmDeck = document.getElementById(deckId);
        elmDeck.style.left = "10px";
        elmDeck.style.top = (100 * iDeck + 400) + "px";
    }

    // Board. ドロップされる側
    let board = document.getElementById('board');
    board.ondragover = function (event) {
        event.dataTransfer.dropEffect = "move";
        // ドロップ許可
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            return false;
        }
    };

    // Tiles.
    for (let i = 0; i < 100; i += 1) {
        let id = 'tile' + i;
        let elmTile = document.getElementById(id);
        if (elmTile !== null) {
            G.angleDeg[id] = 0;
            elmTile.draggable = true;

            // 初期位置
            elmTile.style.left = Math.floor(Math.random() * 1200) + 'px';
            elmTile.style.top = Math.floor(Math.random() * 800) + 'px';

            // https://hakuhin.jp/js/data_transfer.html#DATA_TRANSFER_04
            elmTile.ondragstart = onDragStart;
            // function (event) {
            // event.dataTransfer.effectAllowed = "move";
            // };

            // タイルの上にも落としたい
            elmTile.ondragover = function (event) {
                event.dataTransfer.dropEffect = "move";
                // ドロップ許可
                if (event.preventDefault) {
                    event.preventDefault();
                } else {
                    return false;
                }
            };

            elmTile.ondrag = onDrag;
            // elmTile.ondrag = function (event) {
            // let id = event.target.id;
            // if (!(event.clientX === 0 && event.clientY === 0)) {
            // elmTile.style.left = event.clientX + 'px';
            // elmTile.style.top = event.clientY + 'px';
            // }
            // };

            /**
             * Clicked tag such as img.
             * @param {string} id - HTML tag id.
             */
            elmTile.onclick = function (event) {
                let id = event.target.id;
                G.angleDeg[id] = (G.angleDeg[id] + 30) % 360;
                document.getElementById(id).style.transform = 'rotate(' + G.angleDeg[id] + 'deg)';
            };
        }
    }
}
