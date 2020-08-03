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

**css-selector**: <string> | css selector of an element<br>
**multiple**: <boolean> | return single node or node-list (querySelectorAll)

```js
const el = node('body > main')
```

### new Element(tagname)
JavaScript class to create elements

```js
const image = new Element('img');

// Add classes (array)
image.class(['animate__animated', 'animate__fadeIn'])

// Set attributes (nested arrays)
image.attributes([
  ['src', 'https://...'],
  ['width', '100%']
])

// Log element
image.log()

// Return element
image.return()
```
