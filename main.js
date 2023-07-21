import { useAutoBuild, ViewManager, View, Element } from './domkit/domkit.js';
import { UIButton, UIList, UILabel, UILink, Newline } from './domkit/ui.js';
import { TextTransformer } from './domkit/texttransformer.js';

const vm = new ViewManager();

useAutoBuild();

class MainView extends View {
	viewDidLoad() {
		this.useContainer();

		let counter = 0;

		const label = new UILabel();
		TextTransformer.print(label.ref, 'Test paragraph', 50);

		(new UIButton('Click Me!'))
		.primary()
			.fluid()
			.onClick(btn => btn.setText(++counter));

		(new UILink('Go to second view'))
		.onClick(e => vm.switchTo(View2));

		(new UIButton('Bottom fixed'))
		.primary()
			.fixBottom();
	}
}

class View2 extends View {
	viewDidLoad() {
		this.useContainer();

		(new UILink('Back'))
		.onClick(e => vm.switchTo(MainView));
		new Newline();
		new UILabel('Hello, world!');
	}
}

vm.addView(MainView);
vm.addView(View2);