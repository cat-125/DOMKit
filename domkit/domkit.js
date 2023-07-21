import { getDocument, animateElement, generateId } from './functions.js';

const document = getDocument();
let autoAdd = false
let currentBuildingView = null;
let buildingQueue = [];

class SupportsEvents {
	constructor() {
		this.listeners = {};
	}

	addEventListener(event, listener, options = {}) {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}
		this.listeners[event].push({
			listener,
			options
		});
	}

	removeEventListener(event, listener) {
		if (this.listeners[event]) {
			const index = this.listeners[event].findIndex(item => item.listener === listener);
			if (index !== -1) {
				this.listeners[event].splice(index, 1);
			}
		}
	}

	dispatchEvent(event) {
		if (this.listeners[event.type]) {
			this.listeners[event.type].forEach(item => {
				const { listener, options } = item;

				if (options.once) {
					this.removeEventListener(event.type, listener);
				}

				listener.call(this, event);
			});
		}
	}
}



export class Element extends SupportsEvents {
	constructor(el = 'div') {
		super();
		this.ref = (typeof el === 'string') ? getDocument().createElement(el) : el;
		this.id = this.ref.id;
		this.ref.addEventListener('any', event => {
			this.dispatchEvent(event);
		});
		if (autoAdd) {
			if (currentBuildingView)
			currentBuildingView.addSubview(this);
			else
				buildingQueue.push(this);
		}
	}

	setText(content) {
		this.ref.textContent = content;
		return this;
	}

	setHTML(content) {
		this.ref.innerHTML = content;
		return this;
	}

	appendText(text) {
		this.ref.insertAdjacentText('beforeend', text);
		return this;
	}

	appendHTML(content) {
		this.ref.insertAdjacentHTML('beforeend', content);
		return this;
	}

	addText(text, position = 'beforeend') {
		this.ref.insertAdjacentText(position, text);
		return this;
	}

	addHTML(content, position = 'beforeend') {
		this.ref.insertAdjacentHTML(position, content);
		return this;
	}

	addSubview(view) {
		if (!view) {
			throw new Error('View is not defined');
		}
		// Check if view is html element or not
		this.ref.appendChild(view instanceof Element ? view.ref : view);
		return this;
	}

	insertSubview(element, position = 'beforeend') {
		if (!element) {
			throw new Error('Element is not defined');
		}
		this.ref.insertAdjacentElement(position, element instanceof Element ? element.ref : element);
		return this;
	}

	setAttr(name, value) {
		this.ref.setAttribute(name, value);
		return this;
	}

	getAttr(name) {
		return this.ref.getAttribute(name);
	}

	removeAttr(name) {
		this.ref.removeAttribute(name);
		return this;
	}

	// Events
	onClick(callback) {
		this.ref.addEventListener('click', callback.bind(this, this));
		return this;
	}

	onDblClick(callback) {
		this.ref.addEventListener('dblclick', callback.bind(this, this));
		return this;
	}

	onMouseOver(callback) {
		this.ref.addEventListener('mouseover', callback.bind(this, this));
		return this;
	}

	onMouseOut(callback) {
		this.ref.addEventListener('mouseout', callback.bind(this, this));
		return this;
	}

	onMouseMove(callback) {
		this.ref.addEventListener('mousemove', callback.bind(this, this));
		return this;
	}

	onLongClick(callback, delay = 500) {
		const self = this;
		let timeoutId;

		const handleStart = () => {
			timeoutId = setTimeout(() => {
				callback.call(self);
			}, delay);
		};

		const handleEnd = () => {
			clearTimeout(timeoutId);
		};

		this.ref.addEventListener('mousedown', handleStart);
		this.ref.addEventListener('touchstart', handleStart);
		this.ref.addEventListener('mouseup', handleEnd);
		this.ref.addEventListener('touchend', handleEnd);
		this.ref.addEventListener('mouseleave', handleEnd);
		this.ref.addEventListener('touchcancel', handleEnd);
		return this;
	}

	animate(properties, duration = 300) {
		animateElement(this.ref, properties, duration);
		return this;
	}

	/**
	 * @deprecated
	 * use .visible(false) instead
	 */
	hide() {
		this.ref.hidden = true;
		return this;
	}

	/**
	 * @deprecated
	 * use .visible(true) instead
	 */
	show() {
		this.ref.hidden = false;
		return this;
	}

	visible(value) {
		if (!value) {
			return !this.ref.hidden;
		}
		this.ref.hidden = !value;
		return this;
	}

	disabled(value) {
		if (!value) {
			return this.ref.disabled;
		}
		this.ref.hidden = value;
		return this;
	}

	// Element styling methods
	addClass(className) {
		this.ref.classList.add(className);
		return this;
	}

	hasClass(className) {
		return this.ref.classList.contains(className);
	}

	removeClass(className) {
		this.ref.classList.remove(className);
		return this;
	}

	padding(val) {
		if (val) this.ref.style.padding = val;
		else return this.ref.getComputedStyle().padding;
		return this;
	}
	margin(val) {
		if (val) this.ref.style.margin = val;
		else return this.ref.getComputedStyle().margin;
		return this;
	}
	bg(val) {
		if (val) this.ref.style.background = val;
		else return this.ref.getComputedStyle().background;
		return this;
	}
	textColor(val) {
		if (val) this.ref.style.color = val;
		else return this.ref.getComputedStyle().color;
		return this;
	}

	// TODO: Methods for some other styles
}

export class View extends SupportsEvents {
	constructor(doc = document) {
		super();
		const root = this.root = document.createElement('div');
		document.body.appendChild(root);
		this.document = doc || getDocument();
		this.elememtQueue = [];
		this.loaded = false;
		currentBuildingView = this;
		if (document.readyState == 'interactive') {
			this.viewDidLoad();
			this.loaded = true;
			while (this.elememtQueue.length) {
				this.addSubview(this.elememtQueue.shift());
			}
		} else {
			this.document.addEventListener('DOMContentLoaded', () => {
				this.viewDidLoad();
				this.loaded = true;
				while (this.elememtQueue.length) {
					this.addSubview(this.elememtQueue.shift());
				}
			});
		}
		this.id = generateId(16);
		root.id = this.id;
	}

	addSubview(view) {
		if (!this.loaded) {
			this.elememtQueue.push(view);
			return this;
		}
		// Check if view is html element or not
		this.root.appendChild(view instanceof Element ? view.ref : view);
		this.dispatchEvent(new CustomEvent('subViewAdded', {
			detail: view instanceof Element ? view.ref : view
		}));
		return this;
	}

	useContainer() {
		this.root.classList.add('container');
	}

	destroy() {
		this.root.remove();
		if (typeof this.onDestroy === 'function') this.onDestroy();
		this.dispatchEvent(new Event('destroy'));
		this.root = this.id = this.document = undefined;
	}

	viewDidLoad() {}

	static getInstance() {
		let inst = this.prototype._instance;
		if (!inst) {
			inst = new this.prototype.constructor();
			this.prototype._instance = inst;
		}
		return inst;
	}
}

export class IntegratedView extends SupportsEvents {
	constructor(root, doc = document) {
		if (!root) {
			throw new Error('Root element is not defined');
		}
		this.root = typeof root === 'string' ? document.querySelector(root) : root;
		this.document = doc || getDocument();
		this.document.addEventListener('DOMContentLoaded', this.viewDidLoad.bind(this, this.document));
		this.id = this.root.id;
		if (!this.id) {
			throw new Error("Can't get View ID")
		}
	}

	addSubview(view) {
		// Check if view is html element or not
		this.root.appendChild(view instanceof Element ? view.el : view);
		this.dispatchEvent(new CustomEvent('subViewAdded', {
			detail: view instanceof Element ? view.el : view
		}));
		return this;
	}

	destroy() {
		this.root.remove();
		if (typeof this.onDestroy === 'function') this.onDestroy();
		this.dispatchEvent(new Event('destroy'));
		this.root = this.id = this.document = undefined;
	}

	viewDidLoad() {}
}

export class ViewManager {
	constructor() {
		this.views = {};
		this.currentView = null;
	}

	addView(_view) {
		const view = _view.getInstance();
		if (!(view instanceof View)) {
			throw new Error('Invalid view');
		}
		if (!this.currentView) {
			this.currentView = view;
		} else {
			view.root.style.display = 'none';
		}
		this.views[view.id] = view;
	}

	switchTo(view) {
		const viewId = view.getInstance().id;
		if (!this.views[viewId]) {
			throw new Error(`View with id ${viewId} not found`);
		}
		const newView = this.views[viewId];
		if (newView.id == this.currentView.id) return;
		if (this.currentView) {
			gsap.to(this.currentView.root, {
				opacity: 0,
				display: 'none',
				duration: 0.15,
				onComplete: () => {
					gsap.fromTo(newView.root, { opacity: 0 }, { opacity: 1, display: 'block', duration: 0.15 });
				}
			});
		} else {
			newView.root.style.display = 'block';
			gsap.fromTo(newView.root, { opacity: 0 }, { opacity: 1, duration: 0.15 });
		}
		this.currentView = newView;
	}

	removeView(viewId) {
		if (!this.views[viewId]) {
			throw new Error(`View with id ${viewId} not found`);
		}
		delete this.views[viewId];
	}

	destroyView(viewId) {
		if (!this.views[viewId]) {
			throw new Error(`View with id ${viewId} not found`);
		}
		this.views[viewId].destroy();
		delete this.views[viewId];
	}

	getViewById(viewId) {
		if (!this.views[viewId]) {
			throw new Error(`View with id ${viewId} not found`);
		}
		return this.views[viewId];
	}
}

export function useAutoBuild() {
	autoAdd = true;
}