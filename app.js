var cells = function() {
	return Array.from(document.getElementsByTagName('td'))
}
var clickCount = 0;


var whenClicked = function(event) {
	clickCount++;
	if (clickCount % 2) {
		var letter = 'X';
	} else {
		var letter = 'O';
	}
	cells()[getID(event.target)].innerText = letter;
	// console.log("i was clicked", event.target);
	dontListen(event.target);
	if (isVictory()) {
		// console.log("victoooory");
		dontListenAll();
	} else if (finished() === 9){
		cells().forEach((cell) => {cell.classList.add('draw')})
		// console.log("drawwwwww");
	}
}

var listen = function() {
	cells().forEach(
		(cell) => {cell.addEventListener('click', whenClicked)}
	)
}
listen();

var dontListenAll = function() {
	cells().forEach(
		(cell) => {cell.removeEventListener('click', whenClicked)}
	)
}
var dontListen = function(cell) {
	cell.removeEventListener('click', whenClicked)
}

var getID = function(cell) {
	var string = cell.id;
	var stringId = string.replace('c', '');
	return Number.parseInt(stringId);
}

// var getIDs = function(cells) {
// 	var result = [];
// 	for (var i = 0; i < cells.length; i++) {
// 		var cell = cells[i]
// 		var string = cell.id;
// 		var stringId = string.replace('c', '');
// 		result.push(Number.parseInt(stringId));
// 	}
// 	return result;
// }
// var ids = getIDs(cells());
// console.log('hahahahaha',ids);

var isMatch = function(arrOfCells) {
	var result = true;
	arrOfCells.forEach((cell) => {
		// console.log(cell , " >>> " , arrOfCells[0]);
		if (cell.innerText === arrOfCells[0].innerText && cell.innerText.length !== 0) {
			result = result && true;
		} else {
			result = false;
		}
	})

	return result;
}

// var isMatch = function(arrOfCells) {
// 	return arrOfCells.every((cell) => {
// 		// console.log(cell , " >>> " , arrOfCells[0]);
// 		cell.innerText === arrOfCells[0].innerText && cell.innerText.length !== 0
// 	})
// }

var gameOver = function(lastArr) {
	lastArr.forEach((cell) => {cell.classList.add('winner')});
	// dontListenAll();
}


var isVictory = function() {
	var victorious = false;
	var winners = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ];
	
	winners.forEach((win) => {
		var cellsNow = cells();
		var arr = [cellsNow[win[0]], cellsNow[win[1]], cellsNow[win[2]]];
		if (isMatch(arr)) {
			victorious = true;
			gameOver(arr);
		}
	});
	return victorious;
}


var finished = function() {
	var count = 0;
	cells().forEach((cell) => {
		if (cell.innerText.length !== 0) {
			count++;
		}
	});
	return count;
}

var btn = document.getElementById('restartBtn');
var btnListen = function() {
	btn.addEventListener("click", () => {
    	cells().forEach((cell) => {
    		cell.innerText = "";
    		cell.classList.remove('winner') || cell.classList.remove('draw');
    		listen();
    	});
	});
}
btnListen();










