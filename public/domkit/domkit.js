import { getDocument, animateElement } from './functions.js';

const document = getDocument()

export class Element {
	constructor(el = 'div') {
		this.el = (typeof el === 'string') ? getDocument().createElement(el) : el;
		this.id = this.el.id;
	}

	setText(content) {
		this.el.textContent = content;
		return this;
	}

	setHTML(content) {
		this.el.innerHTML = content;
		return this;
	}

	appendText(text) {
		this.el.insertAdjacentText('beforeend', text);
		return this;
	}

	appendHTML(content) {
		this.el.insertAdjacentHTML('beforeend', content);
		return this;
	}

	addText(text, position = 'beforeend') {
		this.el.insertAdjacentText(position, text);
		return this;
	}

	addHTML(content, position = 'beforeend') {
		this.el.insertAdjacentHTML(position, content);
		return this;
	}

	addSubview(view) {
		if (!view) {
			throw new Error('View is not defined');
		}
		// Check if view is html element or not
		this.el.appendChild(view instanceof Element ? view.el : view);
		return this;
	}

	insertSubview(element, position = 'beforeend') {
		if (!element) {
			throw new Error('Element is not defined');
		}
		this.el.insertAdjacentElement(position, element instanceof Element ? element.el : element);
		return this;
	}

	setAttr(name, value) {
		this.el.setAttribute(name, value);
		return this;
	}

	getAttr(name) {
		return this.el.getAttribute(name);
	}

	removeAttr(name) {
		this.el.removeAttribute(name);
		return this;
	}

	// Events
	onClick(callback) {
		this.el.addEventListener('click', callback);
		return this;
	}

	onDblClick(callback) {
		this.el.addEventListener('dblclick', callback);
		return this;
	}

	onMouseOver(callback) {
		this.el.addEventListener('mouseover', callback);
		return this;
	}

	onMouseOut(callback) {
		this.el.addEventListener('mouseout', callback);
		return this;
	}

	onMouseMove(callback) {
		this.el.addEventListener('mousemove', callback);
		return this;
	}

	onLongClick(callback, delay = 500) {
		let timeoutId;

		const handleMouseDown = () => {
			timeoutId = setTimeout(() => {
				callback();
			}, delay);
		};

		const handleMouseUp = () => {
			clearTimeout(timeoutId);
		};

		this.el.addEventListener('mousedown', handleMouseDown);
		this.el.addEventListener('mouseup', handleMouseUp);
		this.el.addEventListener('mouseleave', handleMouseUp);
		return this;
	}

	// Styles
	animate(properties, duration = 300) {
		animateElement(this.el, properties, duration);
		return this;
	}

	hide() {
		this.el.hidden = true;
		return this;
	}

	show() {
		this.el.hidden = false;
		return this;
	}

	// Element styling methods
	addClass(className) {
		this.el.classList.add(className);
		return this;
	}

	removeClass(className) {
		this.el.classList.remove(className);
		return this;
	}

	padding(val) {
		if (val) this.el.style.padding = val;
		else return this.el.getComputedStyle().padding;
		return this;
	}
	margin(val) {
		if (val) this.el.style.margin = val;
		else return this.el.getComputedStyle().margin;
		return this;
	}
	bg(val) {
		if (val) this.el.style.background = val;
		else return this.el.getComputedStyle().background;
		return this;
	}
	textColor(val) {
		if (val) this.el.style.color = val;
		else return this.el.getComputedStyle().color;
		return this;
	}

	// TODO: Methods for some other styles
}

export class View {
	constructor(root, doc = document) {
		if (!root) {
			throw new Error('Root element is not defined');
		}
		this.root = typeof root === 'string' ? document.querySelector(root) : root;
		this.document = doc || getDocument();
		this.document.addEventListener('DOMContentLoaded', this.viewDidLoad.bind(this, this.document));
	}

	addSubview(view) {
		// Check if view is html element or not
		this.root.appendChild(view instanceof Element ? view.el : view);
	}

	viewDidLoad() { }
}

if (typeof module !== 'undefined' && module.exports) module.exports = { Element, View };