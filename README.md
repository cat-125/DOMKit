# Documentation

> **OUTDATED!!!**

This repository contains several JavaScript files that provide functionality for easily creating elements on a web page without any additional HTML or CSS.

# Table of Contents

- [Documentation](#documentation)
- [Installation](#installation)
- ["Hello World" example](#hello-world-example)
- [File description](#file-description)
- [Details](#details)
  - [`SupportsEvents` class](#supportsevents-class)
  - [`Element` class](#element-class)
  - [`View` class](#view-class)


## Usage

HTML:
```html
<script src="path/to/gsap.js"></script>
<script src="path/to/your_script.js"></script>
```
JS:
```javascript
import { View, viewManager } from 'path/to/domkit.js';
import * as UI from 'path/to/ui.js';
```

# "Hello World" Example

Here's an example of how to use the DOMKit to create a simple "Hello World" application:

```javascript
import { View, useAutoBuild, viewManager as vm } from './domkit.js';
import { UIBlock } from './uikit.js';

// Otherwise, we will need to call this.addSubview(...)
useAutoBuild();

class ExampleView extends View {
	viewDidLoad() {
		// Create new text block
		new UIBlock('Hello, world!');
	}
}

vm.addView(ExampleView); // without 'new' keyword
```

In this example, we create a new class called `ExampleView` that extends the [`View`](#view-class) class. We override the `viewDidLoad` method to create a new text element using the UIText class. Finally, we add our view to the `viewManager`.

# File description

- `domkit.js` - basic file with most common APIs.
- `texttransformer.js` - this file exports the `TextTransformer` class, which provides methods for animating text on a web page.
- `functions.js` - some useful functions
- `ui.js` - a set of UI elements

# Details

## `SupportsEvents` Class

The `SupportsEvents` class provides a set of
methods for adding, removing, and dispatching
events.

```javascript
const obj = new SupportsEvents();
const listener = () => {
  console.log('Clicked!');
};
obj.addEventListener('click', listener);
obj.removeEventListener('click', listener);
obj.dispatchEvent(new Event('click'));
```
The `this` keyword inside the
event listener refers to the object that
triggered the event.

Aviable options:
```javascript
{
	once: true
}
```

## `Element` Class

The `Element` class extends the `SupportsEvents`
class and provides a set of methods for
creating and manipulating HTML elements.

```javascript
const element = new Element('div');
```

Methods:
- `setText(content)`
- `setHTML(content)`
- `appendText(text)`
- `appendHTML(content)`
- `insertText(text, position = 'beforeend')`
- `insertHTML(content, position = 'beforeend')`
- `addSubview(view)`
- `insertSubview(element, position = 'beforeend')`
- `setAttr(name, value)`
- `getAttr(name)`
- `removeAttr(name)`
- `onClick(callback)`, `onDblClick(callback)`,
 `onMouseOver(callback)`, `onMouseOut(callback)`,
 `onMouseMove(callback)`, `onLongClick(callback, delay)`
- `animate(properties, duration = 300)`
- `hide()`
- `show()`
- `addClass(className)`, `removeClass(className)`
- `padding(val)`, `margin(val)`, `bg(val)`,
 `textColor(val)`, `bold()`, `font(font)`,
 `fontSize(val)`, `centered()`

## `View` Class

The `View` class provides a basic structure for creating views in a web application.

```javascript
class ExampleView extends View {
	viewDidLoad() {
		// Create new text block
		new UIBlock('Hello, world!');
	}
}
```

The `View` class is intended to be subclassed to create more specific views for a web application.

## UI Classes

These classes cn be foind in `ui.js` file.

**Controls**:
- `Button(text)`
- `ButtonLink(text)` - link that can be used as button
- `Link(text, href)` - just link
- `Input(placeholder)` - enter text in it
- `Select(items)` - dropdown menu
**Text**:
- `Block(text)` - `div` container
- `Header(size, text)`
- `Text(text)` - `span` element
- `Paragraph(text)` - `p` element
- `Newline()` - `br`
- `Badge(text)` - badge
**Layouts**:
- `Container()`
- `HorizontalLayout()`
- `NavigationMenu({titleText, canGoBack = false, backView, backText})` - complex navigation menu fixed at top of screen
**Complex views**:
- `Card()`
- `List(items)`
- `Segment()`
- `Overlay()`
- `TopMenu()` (recommend to use NavigationMenu instead)
- `BottomMenu()`
- `Space(size)`