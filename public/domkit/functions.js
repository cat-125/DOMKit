export function getDocument() {
	let doc = document || (typeof window !== 'undefined' ? window.document : undefined);
	if (typeof doc === 'undefined' && typeof module !== 'undefined') {
		doc = require('jsdom').JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');
	}
	return doc;
}

export function animateElement(element, properties, duration) {
	let startValues = {};
	let endValues = {};
	let startTime = null;

	// сохраняем начальные значения свойств
	for (let property in properties) {
		startValues[property] = parseFloat(getComputedStyle(element)[property]);
		endValues[property] = parseFloat(properties[property]);
	}

	function step(timestamp) {
		if (!startTime) startTime = timestamp;
		let progress = (timestamp - startTime) / duration;

		// применяем изменения к элементу
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