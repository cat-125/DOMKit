import { useAutoBuild, viewManager as vm, View, Element } from './domkit/domkit.js';
import * as UI from './domkit/ui-auto.js';
import { TextTransformer } from './domkit/texttransformer.js';

UI.importCSSFiles(['/domkit/css/splash.min.css', '/domkit/css/domkit.css']);

class MainView extends View {
	viewDidLoad() {
		this.useContainer();

		let counter = 0;

		const text = UI.Block();
		TextTransformer.print(text.ref, 'Test paragraph', 50);

		UI.Button('Click Me!')
			.primary()
			.fluid()
			.onClick(btn => btn.setText(++counter));

		UI.ButtonLink('Go to second view')
			.onClick(e => vm.switchTo(View2));

		UI.Button('Bottom fixed')
			.primary()
			.fixBottom();
	}
}

class View2 extends View {
	viewDidLoad() {
		this.useContainer();

		UI.NavigationMenu({
			backView: MainView,
			titleText: 'View 2',
			canGoBack: true
		});
		UI.Space(2);
		UI.Newline();
		UI.Block('Hello, world!');
		UI.Space(3);
		UI.Block('↓↓↓ Scroll down ↓↓↓').centered();
		UI.Space(3);
		for (var i = 0; i < 100; i++) {
			UI.Block('Text, text, text, text');
		}

	}
}

vm.addView(MainView);
vm.addView(View2);