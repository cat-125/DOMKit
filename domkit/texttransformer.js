export class TextTransformer {
	constructor(el) {
		this.el = typeof el === 'string' ? document.querySelector(el) : el;
	}

	print(text, delay) {
		return new Promise((resolve) => {
			const { el } = this;
			let currentText = el.textContent;
			let i = 0;
			const intervalId = setInterval(() => {
				if (currentText === text) {
					clearInterval(intervalId);
					resolve();
					return;
				}

				currentText += text[i];
				el.textContent = currentText;
				i += 1;
			}, delay);
		});
	}

	static print(el, text, delay) {
		return (new TextTransformer(el)).print(text, delay);
	}

	erase(delay) {
		return new Promise((resolve) => {
			const { el } = this;
			let text = el.textContent;
			let i = 0;
			const intervalId = setInterval(() => {
				if (text.length === 0) {
					clearInterval(intervalId);
					resolve();
					return;
				}

				text = text.slice(0, -1);
				el.textContent = text;
				i += 1;
			}, delay);
		});
	}

	static erase(el, delay) {
		return (new TextTransformer(el)).erase(delay);
	}
}