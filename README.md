# DOMKit Documentation
This documentation provides an overview of the DOMKit and its components. This framework is designed to simplify the creation of user interfaces using JavaScript classes.

# Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
  - [UIContainer](#uicontainer)
  - [UILabel](#uilabel)
  - [UICard](#uicard)
  - [UIButton](#uibutton)
  - [UISelect](#uiselect)
  - [UIBadge](#uibadge)
  - [UIInput](#uiinput)
  - [UIList](#uilist)
  - [UISegment](#uisegment)
  - [UIOverlay](#uioverlay)

# Installation
To use this framework, simply include the JavaScript file containing the framework classes in your project.
```html
<script src="path/to/domkit.js" type="module"></script>
```
> **Note**: you can import it not as module, but this is not recommended.

# Usage
To use the framework, create instances of the desired components and add them to other components or the DOM.

```javascript
import { View, Element } from 'domkit.js';
import { UIButton, UICard, UIContainer, UIList } from 'uikit.js';

class MainView extends View {
  viewDidLoad() {
    const container = new UIContainer();
    const card = new UICard();
    const title = new Element('h2').setText('Hello, world!');
    const content = new Element('p').setText('This is an example of using the UI framework.');
    const button = new UIButton().setText('Click me!');

    card.setTitle('Example Card');
    card.setContent('This is an example of a card component.');
    card.addButton(button);

    container.addSubview(card);

    const list = new UIList();
    list.addItem(new Element('span').setText('Item 1'));
    list.addItem(new Element('span').setText('Item 2'));
    list.addItem(new Element('span').setText('Item 3'));

    container.addSubview(list);

    this.addSubview(container);
  }
}
```

# Components
### UIContainer
A container for other UI components.
```javascript
const container = new UIContainer();
```

### UILabel
A container for other UI components.
```javascript
const label = new UILabel('Text');
```

### UICard
A card component with methods for setting the title, content, and adding buttons.
```javascript
const card = new UICard();
card.setTitle('Card Title');
card.setContent('Card Content');
card.addButton(new UIButton('Button'));
```

### UIButton
A button component.
```javascript
const button = new UIButton();
button.setText('Click me!');
```

### UISelect
A select component.
```javascript
const select = new UISelect();
```

### UIBadge
A badge component.
```javascript
const badge = new UIBadge('Badge text');
``

### UIInput
An input component.
```javascript
const input = new UIInput();
```

### UIList
A list component with methods for adding and removing items.
```javascript
const list = new UIList();
list.addItem(new Element('span').setText('Item 1'));
list.addItem(new Element('span').setText('Item 2'));
list.removeItem(0);
```

### UISegment
A segment component.
```javascript
const segment = new UISegment();
```

### UIOverlay
An overlay component.
```javascript
const overlay = new UIOverlay();
```

For more information on how to use these components, refer to the Usage section.
