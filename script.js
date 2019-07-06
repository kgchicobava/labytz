let blocks = document.querySelectorAll(".block");
let elementCollection = Array.from(blocks);

let steps = document.querySelectorAll(".step");
let stepsCollection = Array.from(steps);

let start = document.getElementById("start");

start.onclick = startGame;

const NUMBER_OF_MOVES = 10;
const DIRECTION = {
	1: "left",
	2: "down",
	3: "right",
	4: "up"
};
let currentCoords = getStartPosition();

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getStartPosition() {
	let coords = { x: getRandomInt(0, 2), y: getRandomInt(0, 2) };
	return { ...coords };
}

function selectOneFrom(list) {
	return list[Math.floor(Math.random() * list.length)];
}

function clickOnField(ev) {
	if (ev.target.dataset.position === `${currentCoords.x}${currentCoords.y}`) {
		elementCollection.find(
			elem =>
				elem.dataset.position === `${currentCoords.x}${currentCoords.y}`
		).innerHTML = `<img src="img/correct.png" width="100" height="100">`;
	} else {
		ev.target.innerHTML = `<img src="img/wrong.png" width="100" height="100">`;
		elementCollection.find(
			elem =>
				elem.dataset.position === `${currentCoords.x}${currentCoords.y}`
		).innerHTML = `<img src="img/star.png" width="100" height="100">`;
	}
	elementCollection.forEach(elem =>
		elem.removeEventListener("click", clickOnField)
	);
	setTimeout(() => startGame(), 3000);
}

function changePosition(direction, coords) {
	switch (direction) {
		case "left":
			return { ...coords, y: coords.y - 1 };
		case "down":
			return { ...coords, x: coords.x + 1 };
		case "right":
			return { ...coords, y: coords.y + 1 };
		case "up":
			return { ...coords, x: coords.x - 1 };
		default:
			return coords;
	}
}

function getDirection() {
	switch (`${currentCoords.x}${currentCoords.y}`) {
		case "00":
			return selectOneFrom([2, 3]);
		case "02":
			return selectOneFrom([1, 2]);
		case "22":
			return selectOneFrom([1, 4]);
		case "20":
			return selectOneFrom([3, 4]);
		case "01":
			return selectOneFrom([1, 2, 3]);
		case "12":
			return selectOneFrom([1, 2, 4]);
		case "21":
			return selectOneFrom([1, 3, 4]);
		case "10":
			return selectOneFrom([2, 3, 4]);
		default:
			return getRandomInt(1, 4);
	}
}

function startGame() {
    start.disabled = true;
	elementCollection.forEach(elem => {
        elem.innerHTML = ""
        elem.classList.toggle("ready")
        document.querySelector(".game-field").classList.toggle("ready");
    }
        );
	stepsCollection.forEach(elem => (elem.innerHTML = ""));
	elementCollection.find(
		elem => elem.dataset.position === `${currentCoords.x}${currentCoords.y}`
	).innerHTML = `<img src="img/start.png" width="50" height="50">`;
	let i = 1;
	let timer = setInterval(function() {
		let direction = DIRECTION[getDirection()];
		stepsCollection[
			i - 1
		].innerHTML = `<img src="img/${direction}.png" width="40" height="40">`;
		currentCoords = changePosition(direction, currentCoords);
		if (++i > 10) {

			elementCollection.forEach(elem => {
                elem.addEventListener("click", clickOnField)
                elem.classList.toggle("ready")
                document.querySelector(".game-field").classList.toggle("ready");
            }
			);
			clearInterval(timer);
		}
	}, 1000);
}
