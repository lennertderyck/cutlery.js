---
title: Setup cutlery.js
description: How to setup cutlery.js
function: false
---

#### Javascript
##### Node — ESM (recommended)
Add the package to your project

```bash
npm i cutleryjs --save
```

Import it in a file

```js
import {node, Element, ...} from 'cutleryjs'
```

##### Node – require
We've added support for older versions of node

Add the package to your project
```bash
npm i cutleryjs --save
```

Import it in a file with the ```require``` function
```js
const {node, Element, ...} = require('cutleryjs/dist/js/legacy.min.js')
// this directory will change in the next big update
```

##### CDN
Import cutlery directly in a javascript-file using ESM.

```js
import {node, Element, ...} from 'https://unpkg.com/browse/cutleryjs/dist/js/index.js'
```

#### CSS
##### Import SCSS

Import the included css as scss in your project

```scss
@import '~/node_modules/cutleryjs/src/scss/index.scss';
```

If you use Parcel then you can include the scss file directly in your html file

```html
<link rel="stylesheet" href="~/node_modules/cutleryjs/src/scss/index.scss">
```

#### CDN
Add the included css by adding a stylesheet to your project pages

```html
<link rel="stylesheet" href="https://unpkg.com/browse/cutleryjs/dist/css/index.css">
```



