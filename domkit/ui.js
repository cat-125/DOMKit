import { Element, viewManager, getAutoBuild, useAutoBuild } from './domkit.js';

export function importCSSFiles(cssFileUrls) {
	for (const cssFileUrl of cssFileUrls)
		if (!document.querySelector(`link[href="${cssFileUrl}"]`)) {
			const link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = cssFileUrl;
			document.head.appendChild(link);
		}
}

export function useLoader() {
	const style = document.createElement('style');
	style.setAttribute('type', 'text/css');
	style.innerHTML = `.dk-view {z-index: -100; opacity: 0; transition: opacity .3s}`;
	document.head.appendChild(style);

	const thingsToLoad = [];
	const loadedThings = [];

	document.querySelectorAll('style, script, img').forEach(el => {
		const i = thingsToLoad.length;
		thingsToLoad.push(el);
		if (el.src || el.href) {
			loadedThings.push(false);
			el.onload = () => {
				loadedThings[i] = true;

				for (const k of loadedThings) {
					if (!k) return;
				}

				style.innerHTML = `.dk-view {opacity: 1; transition: opacity .3s}`;
			};
		} else {
			loadedThings.push(true);
		}

		for (const k of loadedThings) {
			if (!k) return;
		}

		style.innerHTML = `.dk-view {opacity: 1; transition: opacity .3s}`;
	})
}

/* UI controls */

export class Button extends Element {
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

export class ButtonLink extends Element {
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

export class Link extends Element {
	constructor(text, href) {
		super('a');
		if (text) this.setText(text);
		if (href) this.href(href);
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

export class Input extends Element {
	constructor(placeholder) {
		super('div');
		const input = this.input = new Element('input');
		this.addClass('input').addSubview(input);
		if (placeholder) this.placeholder(placeholder);
	}

	val(val) {
		if (!val) return this.input.ref.value;
		this.input.ref.value = val;
		return this;
	}

	placeholder(text) {
		this.input.ref.placeholder = text;
	}
}

export class Select extends Element {
	constructor(items) {
		super('select');
		this.addClass('select');
		if (items) items.forEach(item => this.addItem(item));
	}

	addItem(text, val) {
		const item = new Element('option');
		item.setText(text).setAttr('value', val);
		this.addSubview(item);
		return this;
	}

	removeItem(id) {
		const item = this.ref.querySelector(`option:nth-child(${id})`);
		if (item) {
			this.ref.removeChild(item);
		}
		return this;
	}
}

/* Text views */

export class Block extends Element {
	constructor(text) {
		super();
		if (text) this.setText(text);
	}
}

export class Text extends Element {
	constructor(text) {
		super('span');
		if (text) this.setText(text);
	}
}

export class Header extends Element {
	constructor(size = 3, text) {
		super('h' + size);
		this.addClass('header');
		if (text) this.setText(text);
	}
}

export class Paragraph extends Element {
	constructor(text) {
		super('p');
		if (text) this.setText(text);
	}
}

export class Newline extends Element {
	constructor() {
		super('br');
	}
}

export class Badge extends Element {
	constructor(text) {
		super('span');
		this.addClass('badge');
		if (text) this.setText(text);
	}

	outline() {
		this.addClass('oitline');
	}
}

/* Layouts */

export class Container extends Element {
	constructor() {
		super('div');
		this.addClass('container');
	}
}

export class HorizontalLayout extends Element {
	constructor() {
		super('div');
		this.addClass('dk-horizontal-layout');
	}
}

export class NavigationMenu extends Element {
	constructor({
		titleText = '',
		canGoBack = false,
		backView = null,
		backText = '< Back'
	}) {
		super('div');
		const title = this.title = (new Text(titleText)).bold();
		this
			.addClass('top-menu')
			.addClass('align-panel')
			.padding('1em');
		if (canGoBack) {
			this.backView = backView;
			const backLink = this.backLink = new ButtonLink(backText);
			this
				.addClass('cols-3')
				.addSubview(backLink);
			backLink.onClick(() => {
				viewManager.switchTo(this.backView);
			});
		} else this.addClass('cols-1');
		this.addSubview(title);
	}

	setTitle(text) {
		this.title.setText(text);
	}

	setBackView(backView) {
		this.backView = backView;
	}
}

/* Complex views */

export class Card extends Element {
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

export class List extends Element {
	constructor(items) {
		super('div');
		this.addClass('list');
		if (items) items.forEach(item => this.addItem(item));
	}

	addItem(view) {
		const item = new Element('div').addClass('item');
		if (typeof view !== 'string') {
			item.addSubview(view);
			this.addSubview(item);
		} else {
			const label = new Label();
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

export class Segment extends Element {
	constructor() {
		super('div');
		this.addClass('segment');
	}
}

export class Overlay extends Element {
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

export class TopMenu extends Element {
	constructor() {
		super('div');
		this
			.addClass('top-menu')
			.addClass('dk-horizontal-layout');
	}
}

export class BottomMenu extends Element {
	constructor() {
		super('div');
		this
			.addClass('bottom-menu')
			.addClass('dk-horizontal-layout');
	}
}

export class Space extends Element {
	constructor(size = 2) {
		super('div');
		this.css({
			visibility: 'none',
			padding: 0,
			margin: 0
		});
		if (size) this.size(size);
	}

	size(val) {
		if (typeof val === 'number') val = val + 'em';
		this.css('height', val);
	}
}