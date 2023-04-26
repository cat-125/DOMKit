import { View, Element } from './domkit/domkit.js';
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

		const button = new UIButton('Click Me!');
		button
			.addClass('primary')
			.addClass('fluid')
			.onClick(() => {
				list.addItem(`You clicked the button!`);
				counter++;
				label.setText(counter);
			});

		container.addSubview(label);
		container.addSubview(button);
		container.addSubview(list);

		this.addSubview(container);
	}
}

new MainView('#root');