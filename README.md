# Documentation

This repository contains several JavaScript files that provide functionality for easily creating elements on a web page without any additional HTML or CSS.

# Table of Contents

- [Documentation](#documentation)
- [Installation](#installation)
- ["Hello World" example](#hello-world-example)
- [Description](#description)
  - [`domkit.js`](#domkitjs)
  - [`texttransformer.js`](#texttransformerjs)
  - [`functions.js`](#functionsjs)
- [Details](#details)
  - [`SupportsEvents` class](#supportsevents-class)
  - [`Element` class](#element-class)
  - [`View` class](#view-class)
  - [`UIButton` class](#uibutton-class)
  - [`UIButton` class](#uibutton-class)
  - [`UILabel` Class](#uilabel-class)
  - [`UIContainer` Class](#uicontainer-class)
  - [`UIBadge` Class](#uibadge-class)
  - [`UICard` Class](#uicard-class)
  - [`UIInput` Class](#uiinput-class)
  - [`UISelect` Class](#uiselect-class)
  - [`UIList` Class](#uilist-class)
  - [`UISegment` Class](#uisegment-class)
  - [`UIOverlay` Class](#uioverlay-class)


## Installation

To use the functionality provided by these JavaScript files, you can include them in your HTML file using the `script` tag:

```html
<script src="path/to/domkit.js"></script>
<script src="path/to/texttransformer.js"></script>
<script src="path/to/functions.js"></script>
```

# "Hello World" Example

Here's an example of how to use the DOMKit to create a simple "Hello World" application:

Sure! Here's an example using the `ExampleView` class:

```javascript
import { View } from './domkit.js';
import { UILabel } from './uikit.js';

class ExampleView extends View {
	viewDidLoad() {
		// Create new label
		const label = new UILabel('Hello, world!');
		
		// Add the label to the view
		this.addSubview(label);
	}
}

const myView = new ExampleView('#app');
```

In this example, we create a new class called `ExampleView` that extends the [`View`](#view) class. We override the `viewDidLoad` method to create a new label element using the [`UILabel`](#uilabel) class and add it to the view using the `addSubview` method. Finally, we create a new instance of the `ExampleView` class and call the `viewDidLoad` method to display the view. The `ExampleView` class provides a reusable structure for creating views with a specific layout and functionality.

# Description

### `domkit.js`

This file defines a set of classes that extend the base `Element` class from the DOMKit framework. The classes include:

- `UIButton`: for creating buttons.
- `UILabel`: for creating text labels.
- `UIContainer`: for creating containers.
- `UIBadge`: for creating badges.
- `UICard`: for creating cards.
- `UIInput`: for creating input fields.
- `UISelect`: for creating dropdown lists.
- `UIList`: for creating lists.
- `UISegment`: for creating segments.
- `UIOverlay`: for creating overlays.

Each class has its own constructor, which calls the constructor of the base `Element` class and adds additional methods and properties. For example, the `UIButton` class adds a `setText` method, which sets the text on the button, and the `UICard` class adds `setTitle`, `setContent`, and `addButton` methods, which set the title, content, and buttons on the card, respectively.

The `UIList` class has `addItem` and `removeItem` methods, which add and remove items from the list. If the passed-in item is not a string, it is added to the list as a child element; otherwise, a new `UILabel` element is created with the passed-in text and added to the list.

The `UIOverlay` class has `show` and `hide` methods, which add and remove the `active` class to the element to show or hide the overlay, respectively.

### `texttransformer.js`

This file exports the `TextTransformer` class, which provides methods for animating text on a web page.

- `constructor(el)`: the constructor of the class, which takes an element `el` and saves it in the `this.el` property. If the passed-in element is a string, it gets the element from the document using the `getDocument().querySelector(el)` function.

- `print(text, delay)`: a method that prints the `text` on the `this.el` element with a delay of `delay` between each character. Returns a promise that resolves when the printing is complete.

- `static print(el, text, delay)`: a static method that creates a new instance of the `TextTransformer` class with the `el` element and calls the `print` method on this instance.

- `erase(delay)`: a method that erases the text on the `this.el` element with a delay of `delay` between each character. Returns a promise that resolves when the erasing is complete.

- `static erase(el, delay)`: a static method that creates a new instance of the `TextTransformer` class with the `el` element and calls the `erase` method on this instance.

### `functions.js`

This file exports two functions:

- `getDocument()`: a function that returns the document object. If the `document` object is defined, it is returned. Otherwise, if the `window` object is defined, its `document` property is returned. If neither `document` nor `window` is defined, the function uses the `jsdom` library to create a document object and returns it.

- `animateElement(element, properties, duration)`: a function that animates the `element` by changing its `properties` over `duration` milliseconds. The function uses the `getComputedStyle` method to get the current values of the element's properties and saves them in the `startValues` object. Then the function calculates the end values of the element's properties and saves them in the `endValues` object. The function uses the `requestAnimationFrame` method for smooth animation of the element's property changes. In each animation frame, the function calculates the current value of the element's properties and applies them to the element. When the animation is complete, the function stops calling the `requestAnimationFrame` method.

# Details

## `SupportsEvents` Class

The `SupportsEvents` class provides a set of methods for adding, removing, and dispatching events.

### `constructor()`

The constructor of the `SupportsEvents` class initializes an empty `listeners` object.

```javascript
const obj = new SupportsEvents();
```

### `addEventListener(event, listener, options = {})`

The `addEventListener` method adds an event listener to the object.

- `event`: a string that specifies the name of the event to listen for.
- `listener`: a function that will be called when the event is triggered.
- `options`: an optional object that specifies additional options for the event listener. The options include:
  - `once`: a boolean that specifies whether the event listener should be removed after it is triggered. Defaults to `false`.

```javascript
const obj = new SupportsEvents();
obj.addEventListener('click', () => {
  console.log('Clicked!');
});
```

### `removeEventListener(event, listener)`

The `removeEventListener` method removes an event listener from the object.

- `event`: a string that specifies the name of the event to remove the listener from.
- `listener`: the function that was used as the event listener.

```javascript
const obj = new SupportsEvents();
const listener = () => {
  console.log('Clicked!');
};
obj.addEventListener('click', listener);
obj.removeEventListener('click', listener);
```

### `dispatchEvent(event)`

The `dispatchEvent` method triggers an event on the object.

- `event`: an object that specifies the event to trigger. The object should have a `type` property that specifies the name of the event.

```javascript
const obj = new SupportsEvents();
obj.addEventListener('click', () => {
  console.log('Clicked!');
});
obj.dispatchEvent({ type: 'click' });
```

When an event is triggered, all event listeners that are listening for that event are called in the order in which they were added. If an event listener was added with the `once` option set to `true`, it is removed after it is triggered. The `this` keyword inside the event listener refers to the object that triggered the event.

## `Element` Class

The `Element` class extends the `SupportsEvents` class and provides a set of methods for creating and manipulating HTML elements.

### `constructor(el = 'div')`

The constructor of the `Element` class takes an optional parameter:

- `el`: a string or an HTML element that specifies the tag name or the element to create. Defaults to `'div'`.

```javascript
const element = new Element('div');
```

### `setText(content)`

The `setText` method sets the text content of the element.

```javascript
const element = new Element('div');
element.setText('Hello, world!');
```

### `setHTML(content)`

The `setHTML` method sets the HTML content of the element.

```javascript
const element = new Element('div');
element.setHTML('<h1>Hello, world!</h1>');
```

### `appendText(text)`

The `appendText` method appends text to the end of the element.

```javascript
const element = new Element('div');
element.appendText('Hello, ');
element.appendText('world!');
```

### `appendHTML(content)`

The `appendHTML` method appends HTML to the end of the element.

```javascript
const element = new Element('div');
element.appendHTML('<h1>Hello, </h1>');
element.appendHTML('<h2>world!</h2>');
```

### `addText(text, position = 'beforeend')`

The `addText` method adds text to the element at the specified position.

- `text`: a string that specifies the text to add.
- `position`: a string that specifies the position to add the text. Defaults to `'beforeend'`.

```javascript
const element = new Element('div');
element.addText('Hello, ', 'afterbegin');
element.addText('world!', 'beforeend');
```

### `addHTML(content, position = 'beforeend')`

The `addHTML` method adds HTML to the element at the specified position.

- `content`: a string that specifies the HTML to add.
- `position`: a string that specifies the position to add the HTML. Defaults to `'beforeend'`.

```javascript
const element = new Element('div');
element.addHTML('<h1>Hello, </h1>', 'afterbegin');
element.addHTML('<h2>world!</h2>', 'beforeend');
```

### `addSubview(view)`

The `addSubview` method adds a subview to the element.

- `view`: an instance of the `Element` class or an HTML element.

```javascript
const parent = new Element('div');
const child = new Element('div');
parent.addSubview(child);
```

### `insertSubview(element, position = 'beforeend')`

The `insertSubview` method inserts an element at the specified position.

- `element`: an instance of the `Element` class or an HTML element.
- `position`: a string that specifies the position to insert the element. Defaults to `'beforeend'`.

```javascript
const parent = new Element('div');
const child = new Element('div');
parent.insertSubview(child, 'afterbegin');
```

### `setAttr(name, value)`

The `setAttr` method sets the value of the specified attribute on the element.

- `name`: a string that specifies the name of the attribute.
- `value`: a string that specifies the value of the attribute.

```javascript
const element = new Element('div');
element.setAttr('class', 'my-class');
```

### `getAttr(name)`

The `getAttr` method gets the value of the specified attribute on the element.

- `name`: a string that specifies the name of the attribute.

```javascript
const element = new Element('div');
element.setAttr('class', 'my-class');
console.log(element.getAttr('class')); // 'my-class'
```

### `removeAttr(name)`

The `removeAttr` method removes the specified attribute from the element.

- `name`: a string that specifies the name of the attribute.

```javascript
const element = new Element('div');
element.setAttr('class', 'my-class');
element.removeAttr('class');
```

### `onClick(callback)`

The `onClick` method adds a click event listener to the element.

- `callback`: a function that will be called when the element is clicked.

```javascript
const element = new Element('button');
element.onClick(() => {
  console.log('Button clicked!');
});
```

### `onDblClick(callback)`

The `onDblClick` method adds a double click event listener to the element.

- `callback`: a function that will be called when the element is double clicked.

```javascript
const element = new Element('button');
element.onDblClick(() => {
  console.log('Button double clicked!');
});
```

### `onMouseOver(callback)`

The `onMouseOver` method adds a mouse over event listener to the element.

- `callback`: a function that will be called when the mouse is over the element.

```javascript
const element = new Element('div');
element.onMouseOver(() => {
  console.log('Mouse over!');
});
```

### `onMouseOut(callback)`

The `onMouseOut` method adds a mouse out event listener to the element.

- `callback`: a function that will be called when the mouse is out of the element.

```javascript
const element = new Element('div');
element.onMouseOut(() => {
  console.log('Mouse out!');
});
```

### `onMouseMove(callback)`

The `onMouseMove` method adds a mouse move event listener to the element.

- `callback`: a function that will be called when the mouse moves over the element.

```javascript
const element = new Element('div');
element.onMouseMove(() => {
  console.log('Mouse move!');
});
```

### `onLongClick(callback, delay)`

The `onLongClick` method adds a long click event listener to the element.

- `callback`: a function that will be called when the element is long clicked.
- `delay`: an optional number that specifies the delay in milliseconds before the `callback` function is called. Defaults to `500`.

```javascript
const element = new Element('button');
element.onLongClick(() => {
  console.log('Button long clicked!');
}, 1000);
```

When the user presses and holds the mouse button or touch screen on the element, the `callback` function will be called after the specified `delay` time has elapsed. If the user releases the mouse button or touch screen before the `delay` time has elapsed, the `callback` function will not be called.

The `onLongClick` method returns the `Element` instance to allow for method chaining.

### `animate(properties, duration = 300)`

The `animate` method animates the element with the specified properties and duration.

- `properties`: an object that specifies the CSS properties to animate and their target values.
- `duration`: a number that specifies the duration of the animation in milliseconds. Defaults to `300`.

```javascript
const element = new Element('div');
element.animate({ opacity: 0 }, 1000);
```

### `hide()`

The `hide` method hides the element.

```javascript
const element = new Element('div');
element.hide();
```

### `show()`

The `show` method shows the element.

```javascript
const element = new Element('div');
element.show();
```

### `addClass(className)`

The `addClass` method adds a class to the element.

- `className`: a string that specifies the class to add.

```javascript
const element = new Element('div');
element.addClass('my-class');
```

### `removeClass(className)`

The `removeClass` method removes a class from the element.

- `className`: a string that specifies the class to remove.

```javascript
const element = new Element('div');
element.addClass('my-class');
element.removeClass('my-class');
```

### `padding(val)`

The `padding` method gets or sets the padding of the element.

- `val`: an optional string that specifies the padding value.

```javascript
const element = new Element('div');
element.padding('10px');
console.log(element.padding()); // '10px'
```

### `margin(val)`

The `margin` method gets or sets the margin of the element.

- `val`: an optional string that specifies the margin value.

```javascript
const element = new Element('div');
element.margin('10px');
console.log(element.margin()); // '10px'
```

### `bg(val)`

The `bg` method gets or sets the background color of the element.

- `val`: an optional string that specifies the background color value.

```javascript
const element = new Element('div');
element.bg('red');
console.log(element.bg()); // 'red'
```

### `textColor(val)`

The `textColor` method gets or sets the text color of the element.

- `val`: an optional string that specifies the text color value.

```javascript
const element = new Element('div');
element.textColor('red');
console.log(element.textColor()); // 'red'
```

## `View` Class

The `View` class provides a basic structure for creating views in a web application.

### `constructor(root, doc = document)`

The constructor of the `View` class takes two optional parameters:

- `root`: a string or an HTML element that specifies the root element of the view.
- `doc`: a reference to the document object. Defaults to `document`.

```javascript
const view = new View('#app');
```

### `addSubview(view)`

The `addSubview` method adds a subview to the root element of the view.

- `view`: an instance of the `Element` class or an HTML element.

```javascript
const view = new View('#app');
const element = new Element('div');
view.addSubview(element);
```

### `viewDidLoad()`

The `viewDidLoad` method is called when the view is loaded and ready to be displayed. This method can be overridden in a subclass to perform additional setup or initialization.

```javascript
class MyView extends View {
  viewDidLoad() {
    console.log('View loaded!');
  }
}

const view = new MyView('#app');
```

The `View` class is intended to be subclassed to create more specific views for a web application.

## `UIButton` Class

The `UIButton` class extends the `Element` class and provides a set of methods for creating and manipulating button elements.

### `constructor(text)`

The constructor of the `UIButton` class takes an optional parameter:

- `text`: a string that specifies the text content of the button.

```javascript
const button = new UIButton('Click me!');
```

### `setTitle(title)`

The `setTitle` method sets the title of the button.

- `title`: a string that specifies the title of the button.

```javascript
const button = new UIButton('Click me!');
button.setTitle('New title');
```

### `setDisabled(disabled)`

The `setDisabled` method sets the disabled state of the button.

- `disabled`: a boolean that specifies whether the button should be disabled.

```javascript
const button = new UIButton('Click me!');
button.setDisabled(true);
```

## `UILabel` Class

The `UILabel` class extends the `Element` class and provides a set of methods for creating and manipulating label elements.

### `constructor(text)`

The constructor of the `UILabel` class takes an optional parameter:

- `text`: a string that specifies the text content of the label.

```javascript
const label = new UILabel('Hello, world!');
```

### `setText(text)`

The `setText` method sets the text content of the label.

- `text`: a string that specifies the text content of the label.

```javascript
const label = new UILabel();
label.setText('Hello, world!');
```

## `UIContainer` Class

The `UIContainer` class extends the `Element` class and provides a set of methods for creating and manipulating container elements.

### `constructor()`

The constructor of the `UIContainer` class creates a container element.

```javascript
const container = new UIContainer();
```

## `UIBadge` Class

The `UIBadge` class extends the `Element` class and provides a set of methods for creating and manipulating badge elements.

### `constructor(text)`

The constructor of the `UIBadge` class takes an optional parameter:

- `text`: a string that specifies the text content of the badge.

```javascript
const badge = new UIBadge('New');
```

### `setText(text)`

The `setText` method sets the text content of the badge.

- `text`: a string that specifies the text content of the badge.

```javascript
const badge = new UIBadge();
badge.setText('New');
```

## `UICard` Class

The `UICard` class extends the `Element` class and provides a set of methods for creating and manipulating card elements.

### `constructor()`

The constructor of the `UICard` class creates a card element with a title and content section.

```javascript
const card = new UICard();
```

### `setTitle(title)`

The `setTitle` method sets the title of the card.

- `title`: a string that specifies the title of the card.

```javascript
const card = new UICard();
card.setTitle('New title');
```

### `setContent(content)`

The `setContent` method sets the content of the card.

- `content`: a string that specifies the content of the card.

```javascript
const card = new UICard();
card.setContent('<p>New content</p>');
```

### `addButton(button)`

The `addButton` method adds a button to the card.

- `button`: an instance of the `UIButton` class or an HTML element.

```javascript
const card = new UICard();
const button = new UIButton('Click me!');
card.addButton(button);
```

## `UIInput` Class

The `UIInput` class extends the `Element` class and provides a set of methods for creating and manipulating input elements.

### `constructor()`

The constructor of the `UIInput` class creates an input element.

```javascript
const input = new UIInput();
```

### `val(val)`

The `val` method gets or sets the value of the input element.

- `val`: an optional string that specifies the value of the input element.

```javascript
const input = new UIInput();
input.val('New value');
```

## `UISelect` Class

The `UISelect` class extends the `Element` class and provides a set of methods for creating and manipulating select elements.

### `constructor()`

The constructor of the `UISelect` class creates a select element.

```javascript
const select = new UISelect();
```

## `UIList` Class

The `UIList` class extends the `Element` class and provides a set of methods for creating and manipulating list elements.

### `constructor()`

The constructor of the `UIList` class creates a list element.

```javascript
const list = new UIList();
```

### `addItem(view)`

The `addItem` method adds an item to the list.

- `view`: an instance of the `Element` class or a string that specifies the text content of the item.

```javascript
const list = new UIList();
const label = new UILabel('Item 1');
list.addItem(label);
```

### `removeItem(id)`

The `removeItem` method removes an item from the list.

- `id`: a number that specifies the index of the item to remove.

```javascript
const list = new UIList();
list.addItem('Item 1');
list.removeItem(1);
```

## `UISegment` Class

The `UISegment` class extends the `Element` class and provides a set of methods for creating and manipulating segment elements.

### `constructor()`

The constructor of the `UISegment` class creates a segment element.

```javascript
const segment = new UISegment();
```

## `UIOverlay` Class

The `UIOverlay` class extends the `Element` class and provides a set of methods for creating and manipulating overlay elements.

### `constructor()`

The constructor of the `UIOverlay` class creates an overlay element.

```javascript
const overlay = new UIOverlay();
```

### `show()`

The `show` method shows the overlay.

```javascript
const overlay = new UIOverlay();
overlay.show();
```

### `hide()`

The `hide` method hides the overlay.

```javascript
const overlay = new UIOverlay();
overlay.hide();
```
