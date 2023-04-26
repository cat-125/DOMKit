import { Element } from './element.js';

export class View {
	constructor(root, doc = document) {
		if (!root) {
			throw new Error('Root element is not defined');
		}
		this.root = typeof root === 'string' ? document.querySelector(root) : root;
		this.document = doc || document;
		this.document.addEventListener('DOMContentLoaded', this.viewDidLoad.bind(this));
	}

	addSubview(view) {
		// Check if view is html element or not
		this.root.appendChild(view instanceof Element ? view.el : view);
	}

	viewDidLoad() {}
}