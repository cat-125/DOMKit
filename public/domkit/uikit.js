import { Element } from './domkit.js';

class UIButton extends Element {
	constructor(text) {
		super('button');
		this.addClass('btn')
		this.setAttr('type', 'button');
		if (text) this.setText(text);
	}
}

class UILabel extends Element {
	constructor(text) {
		super('span');
		if (text) this.setText(text);
	}
}

class UIContainer extends Element {
	constructor() {
		super('div');
		this.addClass('container');
	}
}

class UIBadge extends Element {
	constructor(text) {
		super('span');
		this.addClass('badge');
		if (text) this.setText(text);
	}
}

class UICard extends Element {
	constructor() {
		super('div');
		this.addClass('card');
		const titleElement = new Element('div').addClass('title');
		const contentElement = new Element('div').addClass('content');
		this.addSubview(titleElement);
		this.addSubview(contentElement);
	}

	setTitle(title) {
		this.titleElement.setText(title);
		return this;
	}

	setContent(content) {
		this.contentElement.setHTML(content);
		return this;
	}

	addButton(button) {
		const buttonsElement = this.el.querySelector('.buttons') || new Element('div').addClass('buttons');
		buttonsElement.addSubview(button);
		if (!this.el.querySelector('.buttons')) this.addSubview(buttonsElement);
		return this;
	}
}

class UIInput extends Element {
	constructor() {
		super('div');
		const input = this.input = new Element('input');
		this.addClass('input').addSubview(input);
	}
}

class UISelect extends Element {
	constructor() {
		super('select');
		this.addClass('select');
	}
}

class UIList extends Element {
	constructor() {
		super('div');
		this.addClass('list');
	}

	addItem(view) {
		const item = new Element('div').addClass('item');
		if (typeof view !== 'string') {
			item.addSubview(view);
			this.addSubview(item);
		} else {
			const label = new UILabel();
			label.setText(view);
			item.addSubview(label);
			this.addSubview(item);
		}
		return this;
	}

	removeItem(id) {
		const item = this.el.querySelector(`.item:nth-child(${id})`);
		if (item) {
			this.el.removeChild(item);
		}
		return this;
	}
}

class UISegment extends Element {
	constructor() {
		super('div');
		this.addClass('segment');
	}
}

class UIOverlay extends Element {
	constructor() {
		super('div');
		this.addClass('overlay');
	}

	show() {
		this.addClass('active');
		return this;
	}

	hide() {
		this.removeClass('active');
		return this;
	}
}

export { UILabel, UIBadge, UICard, UIList, UIInput, UIButton, UISelect, UIOverlay, UISegment, UIContainer };