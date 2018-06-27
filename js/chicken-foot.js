/**
 * Chicken foot.
 * @module js/chicken-foot
 */

/** Global variables. */
G = {
	/** 0 <= x < 360 */
	angleDeg: []
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

function onclickPlyrBtn (event) {
	let id = event.target.id;
	// playerNum1
	let iPlyrN = parseInt(id.slice(9,10),10);
	
	for (let jDeckN = 2; jDeckN < 9; jDeckN += 1) {
		let deckObj = document.getElementById('deck' + jDeckN);
		if (iPlyrN < jDeckN) {
			deckObj.style.display = "none";
		} else {
			deckObj.style.display = "block";
		}
	}
	
	// 配列に 存在するタイルの数字を入れる。
	let array = [];
	let k=0;
	for (let j = 0; j < 10; j += 1) {
		for (let i = 0; i < 10; i += 1) {
			if (i<=j) {
				array[k]=10*i+j;
				k+=1;
			} else {
				break;
			}
		}
	}
	
	// シャッフル
	array = shuffle(array);
	
	let tileNum;
	switch(iPlyrN){
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

	let lTile = 0;
	for (let jDeckN = 1; jDeckN <= iPlyrN; jDeckN += 1) {
		let deckObjId = 'deck' + jDeckN;
		let deckObj = document.getElementById(deckObjId);
		for (let kTileN = 0; kTileN < tileNum; kTileN += 1) {
			let tileObj = document.getElementById('tile' + array[lTile]);
			tileObj.style.left = (parseInt(deckObj.style.left,10)+kTileN*32+20)+'px';
			tileObj.style.top = (parseInt(deckObj.style.top,10)+20)+'px';
			lTile += 1;
		}
	}
	
	let mountainObj = document.getElementById('mountain');
	let m = 0;
	for(; lTile<array.length; lTile+=1){
		let tileObj = document.getElementById('tile' + array[lTile]);
		tileObj.style.left = (parseInt(mountainObj.style.left,10)+m*32+20)+'px';
		tileObj.style.top = (parseInt(mountainObj.style.top,10)+20)+'px';
		m+=1;
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
	for (let iPlyrN = 1; iPlyrN < 9; iPlyrN += 1) {
		let deckId = 'deck' + iPlyrN;
		let deckObj = document.getElementById(deckId);
		deckObj.style.left = "10px";
		deckObj.style.top = (300 + 100*iPlyrN) + "px";
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
		let obj = document.getElementById(id);
		if (obj !== null) {
			G.angleDeg[id] = 0;
			obj.draggable = true;
			
			// 初期位置
			obj.style.left = Math.floor(Math.random() * 1200) + 'px';
			obj.style.top = Math.floor(Math.random() * 800) + 'px';

			// https://hakuhin.jp/js/data_transfer.html#DATA_TRANSFER_04
			obj.ondragstart = function (event) {
				event.dataTransfer.effectAllowed = "move";
			};
			// タイルの上にも落としたい
			obj.ondragover = function (event) {
				event.dataTransfer.dropEffect = "move";
				// ドロップ許可
				if (event.preventDefault) {
					event.preventDefault();
				} else {
					return false;
				}
			};

			obj.ondrag = function (event) {
				let id = event.target.id;
				if (!(event.clientX === 0 && event.clientY === 0)) {
					obj.style.left = event.clientX + 'px';
					obj.style.top = event.clientY + 'px';
				}
			};

			/**
			 * Clicked tag such as img.
			 * @param {string} id - HTML tag id.
			 */
			obj.onclick = function (event) {
				let id = event.target.id;
				G.angleDeg[id] = (G.angleDeg[id] + 30) % 360;
				document.getElementById(id).style.transform = 'rotate(' + G.angleDeg[id] + 'deg)';
			};
		}
	}
}
