import { useAutoBuild, viewManager as vm, View, Element } from './domkit/domkit.js';
import * as UI from './domkit/ui.js';
import { TextTransformer } from './domkit/texttransformer.js';

UI.importCSSFiles(['/domkit/css/splash.min.css', '/domkit/css/domkit.css']);
useAutoBuild();

class MainView extends View {
	viewDidLoad() {
		this.useContainer();

		let counter = 0;

		const text = new UI.Block();
		TextTransformer.print(text.ref, 'Test paragraph', 50);

		(new UI.Button('Click Me!'))
		.primary()
			.fluid()
			.onClick(btn => btn.setText(++counter));

		(new UI.ButtonLink('Go to second view'))
		//.onClick(e => vm.switchTo(View2));

		(new UI.Button('Bottom fixed'))
		.primary()
			.fixBottom();
	}
}

class View2 extends View {
	viewDidLoad() {
		this.useContainer();

		new UI.NavigationMenu({
			backView: MainView,
			titleText: 'View 2',
			canGoBack: true
		});
		new UI.Space(2);
		new UI.Newline();
		new UI.Block('Hello, world!');
		new UI.Space(3);
		(new UI.Block('↓↓↓ Scroll down ↓↓↓')).centered();
		new UI.Space(3);
		for (var i = 0; i < 100; i++) {
			new UI.Block('Text, text, text, text');
		}
		
	}
}

vm.addView(MainView);
vm.addView(View2);