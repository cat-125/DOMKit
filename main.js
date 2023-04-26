import { View } from './domkit/view.js';
import { Element } from './domkit/element.js';
import { UIContainer, UIButton, UIList } from './domkit/uikit.js';
import { TextTransformer } from './domkit/texttransformer.js';

class MainView extends View {
	viewDidLoad() {
		let counter = 0;
		const container = new UIContainer();

		const label = new Element();
		TextTransformer.print(label.el, 'Test paragraph', 50);

		const list = new UIList();
		list.addClass('divided');

		const button = new UIButton('Tap Me!');
		button
			.addClass('primary')
			.addClass('fluid')
			.onClick(() => list.addItem('You clicked the button!'))
			.onLongClick(() => list.addItem('You holded the button!'));

		container.addSubview(label);
		container.addSubview(button);
		container.addSubview(list);

		this.addSubview(container);
	}
}

new MainView('#root');