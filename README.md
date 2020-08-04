# cutlery.js
A set of common javascript and sass tools

[![jsdelivr](https://data.jsdelivr.com/v1/package/npm/cutleryjs/badge)](https://cdn.jsdelivr.net/npm/cutleryjs/dist/) [![npm version](https://badge.fury.io/js/cutleryjs.svg)](https://www.npmjs.com/package/cutleryjs) ![dependencies](https://david-dm.org/lennertderyck/cutlery.js.svg)

## Install
#### Node
Install the package
```bash
npm i cutleryjs --save
```
Import with ES6 modules
```js
import {node, Element, eventCallback) from 'cutleryjs'
```

> Node ```require``` support comming

#### CDN
|          |Unpkg|jsDelivr|
|----------|-----|--------|
|JavaScript|https://unpkg.com/browse/cutleryjs/dist/js/index.js|https://cdn.jsdelivr.net/npm/cutleryjs@1.1.3/dist/js/index.js|
|CSS       |https://unpkg.com/browse/cutleryjs/dist/css/index.css|https://cdn.jsdelivr.net/npm/cutleryjs@1.1.3/dist/css/index.css|

## Tools
### node(css-selector[, multiple])
Simple function to return a DOM element

**css-selector**: <string> css selector of an element<br>
**multiple**: <boolean> return single node or node-list (querySelectorAll)

```js
const el = node('body > main')
```

### new Element(tagname)
JavaScript class to create elements

```js
const link = new Element('a');

// Add classes (array)
link.class(['btn', 'btn--outline'])

// Set attributes (nested arrays)
link.attributes([
  ['href', 'https://...'],
  ['target', '_blank'],
  ['data-tooltip', 'Follow me']
])

// Set innerHTML (string)
link.content = 'Click here <i data-feather="check"></i>'
// or
link.inner('Click here <i data-feather="check"></i>')

// Append to element (node|string)
link.append('body > main .card')

// Prepend to element (node|string)
link.prepend('body > main .card')

// Log element
link.log()

// Return element
link.return()
```

### eventCallback(css-selector, callback[, action])
This function is used to detect the event.target element of an eventListener, so you can a single eventListener for the whole site/application.

**css-selector**: <string> if you added a ```data-action``` attribute you just fill in the value from that attribute, if you define that element in another way, use css selectors<br>
**callback**: the code that will be executed when an element (that matches the css-selector) is detected<br>
**action**: set to false if the element that has to be detected is defined by a ```data-action``` attribute
  
```html
<div data-action="hideMenu">
  hide menu
</div>

```

```js
// set an eventListener
document.eventListener('click', () => {
  eventCallback('hideMenu', (target) => {
    // target returns the element that is detected by the eventlistener
    console.log('menu should be hidden')
  })
})
```



