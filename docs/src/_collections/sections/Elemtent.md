---
title: new Element
parameters: tagname
description: Easily create new nodes
---

- **tagname** *string*: the tagname of the node you want to create

---

#### Steps
##### Create new instance

```js
const element = new Element('div');
```

##### Add (html-)content
You can set the innerHTML of the element using the inner-function;

```js
element.inner(`
    <div class="card__header"><h3>Card-title</h3></div>
    <div class="card__body">Some content</div>
    <div class="card__footer"><button data-action="close"></button></div>
`)
```

You can also use the return-function to set the innerHTML.

```js
element.return().innerHTML = `
    <div class="card__header"><h3>Card-title</h3></div>
    <div class="card__body">Some content</div>
    <div class="card__footer"><button data-action="close"></button></div>
`;
```

##### Add classes (array)
Add an array directly in the function

```js
element.class(['card', 'animate__animated', 'animate__zoomIn']);
```

or create an array first

```js
const classes = ['card', 'animate__animated', 'animate__zoomIn'];
element.class(classes);
```

##### Set attributes (nested arrays)
Set attributes for a node as nested arrays. You can also make an array first, outside the function and then add the variable to the function.

```js
element.attributes([
    ['data-id', 'fJEhegfHJEjknekiz'],
    ['data-tooltip', 'hover over this card']
]);
```

##### Append (css-selector|node)
Append the node to another node. You can append the element multiple times to the DOM.
```js
element.append('main > .card__list');
```

##### Prepend (css-selector|node)
Prepend the node to another node. You can append the element multiple times to the DOM.
```js
element.prepend('main > .card__list');
```

##### The Return of The Node
Return the node so you can easily use it in other functions for example.

```js
element.return();
```

When you use the return-function you can manipulate the object as you would with a normal node.
(See the inner-function for another example)

```js
// check if the node contains a string
element.return().contains('cheese') // returns boolean

// remove when needed
element.return().remove();
```

##### Log
You can easily log the element so you can evaluate the result.
```js
element.log();
```

---

#### Note

You can use the methods throughout the entire javascript-file, depending on when and where you declare the object.

You could add the object to json-object, call it later in your script and apply these same methods.