import { Element } from './domkit.js';

const cssFileUrl = 'domkit/css/splash.min.css';

if (!document.querySelector(`link[href="${cssFileUrl}"]`)) {
	const link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = cssFileUrl;
	document.head.appendChild(link);
}

class UIButton extends Element {
	constructor(text) {
		super('button');
		this.addClass('btn')
		this.setAttr('type', 'button');
		if (text) this.setText(text);
	}

	primary(value = true) {
		const oldVal = this.hasClass('primary');
		if (value == oldVal) return this;
		if (value)
			this.addClass('primary');
		else
			this.removeClass('primary');
		return this;
	}

	fluid(value = true) {
		const oldVal = this.hasClass('fluid');
		if (value == oldVal) return this;
		if (value)
			this.addClass('fluid');
		else
			this.removeClass('fluid');
		return this;
	}

	opaque(value = true) {
		const oldVal = this.hasClass('opaque');
		if (value == oldVal) return this;
		if (value)
			this.addClass('opaque');
		else
			this.removeClass('opaque');
		return this;
	}

	negative(value = true) {
		const oldVal = this.hasClass('negative');
		if (value == oldVal) return this;
		if (value)
			this.addClass('negative');
		else
			this.removeClass('negative');
		return this;
	}
}

class UILink extends Element {
	constructor(text) {
		super('a');
		this.addClass('link');
		if (text) this.setText(text);
	}
	
	href(val) {
		this.ref.href = val;
	}

	negative(value = true) {
		const oldVal = this.hasClass('negative');
		if (value == oldVal) return this;
		if (value)
			this.addClass('negative');
		else
			this.removeClass('negative');
		return this;
	}
}

class UIRawLink extends Element {
	constructor(text) {
		super('a');
		if (text) this.setText(text);
	}
	
	href(val) {
		this.ref.href = val;
	}

	negative(value = true) {
		const oldVal = this.hasClass('negative');
		if (value == oldVal) return this;
		if (value)
			this.addClass('negative');
		else
			this.removeClass('negative');
		return this;
	}
}

class UILabel extends Element {
	constructor(text) {
		super('span');
		if (text) this.setText(text);
	}
}

class Newline extends Element {
	constructor() {
		super('br');
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
		const buttonsElement = this.ref.querySelector('.buttons') || new Element('div').addClass('buttons');
		buttonsElement.addSubview(button);
		if (!this.ref.querySelector('.buttons')) this.addSubview(buttonsElement);
		return this;
	}
}

class UIInput extends Element {
	constructor() {
		super('div');
		const input = this.input = new Element('input');
		this.addClass('input').addSubview(input);
	}

	val(val) {
		if (!val) return this.input.ref.value;
		this.input.ref.value = val;
		return this;
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
		const item = this.ref.querySelector(`.item:nth-child(${id})`);
		if (item) {
			this.ref.removeChild(item);
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

export { Newline, UILabel, UIBadge, UICard, UIList, UIInput, UIButton, UILink, UIRawLink, UISelect, UIOverlay, UISegment, UIContainer };