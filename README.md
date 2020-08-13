# cutlery.js
A set of useful javascript and sass tools

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

> Node ```require``` support in beta

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

If an event is triggered all the eventCallback-functions are executed. They each will compare the css selector of the event target with the given selector as first argument, if they match the function executes the callback.

**css-selector**: <string> if you have added a ```data-action``` attribute you just fill in the value from that attribute, if you defined that element in another way, use css selectors<br>
**callback**: <function> the code that will be executed when an element (that matches the css-selector) is detected<br>
**action**: <boolean> set to false if the element that has to be detected is not defined by a ```data-action``` attribute
  
```html
<!-- add some html -->
<div data-action="hideMenu">
  hide menu
</div>

<div id="wrapper">
  <div class="card">
    Some content here
  </div>
</div>
```

```js
// set an eventListener for the whole page
document.eventListener('click', () => {

  // using data-action attribute on an element 
  eventCallback('hideMenu', (target) => {
    // target returns the element that is detected by the eventlistener
    target.classList.add('menu--hidden') // adds class to the detected element
  })
  
  // using a custom selector on an element, add 'false' as third argument
  eventCallback('#wrapper > .card', (target) => {
    console.log(target.innerHTML) // output: "Some content here"
  }, false)
  
})
```

### getFormData(node)
Returns a Map object with all the data from a form, using the FormData api, so you don't have to manually get all the elements from a form and get there values.

**node**: <node> set the formelement where you want to collect the input-data from

Good to know:
- the keys are the name-attribute values from the input fields.
- textarea fields are also supported
- the value from a number-field will be parsed to number type
- the function only detects fields where a ```name```attribute is set
  
```js
// a simple example
const form = document.querySelector('#newUserForm');
const formData = getFormData(form) // returns a Map object

console.log(formData.get('username')) // logs the value from a field that has a name-attribute set to 'username'

// an other example that is using the eventCallback-function
document.addEventListener('submit', () => {
  eventCallback('#newUserForm', (target) => {
    const formData = getFormData(target) // the form node in this case is the target element that is returned from the callback-function
    
    // do something with the data
    aFunctionToCreateNewUsers({
      name: formData.get('username'),
      email: formData.get('email'),
      dateOfBirth: formData.get('dob'),
    })
  }, false)
})
```
  
