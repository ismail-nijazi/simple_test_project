// main.js

const CARD_PAIRS = [
	{ id: 1, symbol: "🍩" },
	{ id: 2, symbol: "🍕" },
	{ id: 3, symbol: "🍉" },
];

let cards = [];
let flippedCards = [];
let matchedIds = [];
let moves = 0;

const board =
	document.getElementById("game-board");
const moveCounter = document.getElementById(
	"move-counter"
);
const winMessage = document.getElementById(
	"win-message"
);
const restartBtn = document.getElementById(
	"restart-btn"
);

function setupGame() {
	// Prepare and shuffle cards
	cards = shuffle([
		...CARD_PAIRS,
		...CARD_PAIRS,
	]);
	flippedCards = [];
	matchedIds = [];
	moves = 0;
	updateMoveCounter();
	winMessage.classList.add("hidden");
	renderBoard();
}

function renderBoard() {
	board.innerHTML = "";
	cards.forEach((card, idx) => {
		const cardElem =
			document.createElement("div");
		cardElem.className = "card";
		cardElem.dataset.index = idx;
		if (matchedIds.includes(card.id))
			cardElem.classList.add("flipped");
		cardElem.innerHTML = `
      <div class="card-inner">
        <div class="card-front">${card.symbol}</div>
        <div class="card-back"></div>
      </div>
    `;
		cardElem.addEventListener(
			"click",
			onCardClick
		);
		board.appendChild(cardElem);
	});
}

function onCardClick(e) {
	const idx = Number(
		e.currentTarget.dataset.index
	);
	if (
		flippedCards.length === 2 ||
		flippedCards.includes(idx) ||
		matchedIds.includes(cards[idx].id)
	)
		return;
	flipCard(idx);
	flippedCards.push(idx);
	if (flippedCards.length === 2) {
		moves++;
		updateMoveCounter();
		checkForMatch();
	}
}

function flipCard(idx) {
	const cardElems =
		document.querySelectorAll(".card");
	cardElems[idx].classList.add("flipped");
}

function unflipCards(indices) {
	const cardElems =
		document.querySelectorAll(".card");
	indices.forEach((i) =>
		cardElems[i].classList.remove("flipped")
	);
}

function checkForMatch() {
	const [i1, i2] = flippedCards;
	if (cards[i1].id === cards[i2].id) {
		matchedIds.push(cards[i1].id);
		flippedCards = [];
		if (
			matchedIds.length ===
			CARD_PAIRS.length
		) {
			setTimeout(showWin, 400);
		}
	} else {
		setTimeout(() => {
			unflipCards([i1, i2]);
			flippedCards = [];
		}, 900);
	}
}

function updateMoveCounter() {
	moveCounter.textContent = `Moves: ${moves}`;
}

function showWin() {
	winMessage.classList.remove("hidden");
}

restartBtn.addEventListener("click", setupGame);

window.addEventListener(
	"DOMContentLoaded",
	setupGame
);
