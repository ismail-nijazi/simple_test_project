// utils.js

/**
 * Fisher-Yates shuffle
 * @param {Array} array
 * @returns {Array}
 */
function shuffle(array) {
	let arr = array.slice();
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(
			Math.random() * (i + 1)
		);
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

// Export for main.js
if (typeof window !== "undefined") {
	window.shuffle = shuffle;
}
