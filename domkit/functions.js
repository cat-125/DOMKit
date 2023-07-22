export function getDocument() {
	let doc = document || (typeof window !== 'undefined' ? window.document : (globalThis._doc || undefined));
	if (typeof doc === 'undefined' && typeof module !== 'undefined') {
		doc = require('jsdom').JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');
		globalThis._doc = doc;
	}
	return doc;
}

export function animateElement(element, properties, duration) {
	let startValues = {};
	let endValues = {};
	let startTime = null;

	for (let property in properties) {
		startValues[property] = parseFloat(getComputedStyle(element)[property]);
		endValues[property] = parseFloat(properties[property]);
	}

	function step(timestamp) {
		if (!startTime) startTime = timestamp;
		let progress = (timestamp - startTime) / duration;

		for (let property in properties) {
			let value = startValues[property] + (endValues[property] - startValues[property]) * progress;
			element.style[property] = value + 'px';
		}

		if (progress < 1) {
			window.requestAnimationFrame(step);
		}
	}

	window.requestAnimationFrame(step);
}

/**
 * The function generates a random string of a specified length using a given set of characters.
 * 
 * @public
 * 
 * @param {Number} length - The length parameter specifies the length of the generated ID.
 * @param {String} [_chars] - The `_chars` parameter is an optional parameter that allows you to specify a
 * custom set of characters to use for generating the ID. If you don't provide a value for `_chars`,
 * the function will use the default set of characters which includes lowercase letters, uppercase
 * letters, and digits.
 * @returns a randomly generated string of characters with the specified length.
 */
export function generateId(length, _chars = '') {
	const chars = _chars || 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	let result = '';
	for (let i = 0; i < length; i++) {
		result += chars[Math.floor(Math.random() * chars.length)];
	}
	return result;
}

export function camelCase(t) {
	return t.replace(/\-(\w)/g,
		function(b, a) {
			return a[0].toUpperCase() + a.slice(1, a.length).toLowerCase();
		}
	);
}