---
title: returnNode
parameters: node[, multiple = false]
description: Checks if an element is a node, if not it returns a node
---

- **node** *css-selector* | *node*: a css-selector or an actual node
- **multiple** *boolean*: return single node or node-list (querySelectorAll)

---

A good function when you have an other function where the input can be a node or a css-selector, but you are not shure which.

```js
/**
 * This is an example where the function is being used in
*/

const returnText = (input) => {
    const element = returnNode(input , true); // no mather what a developer would give as input parameter, the function would return an element
    return element.innerText;
}

const $pane = document.querySelector('#app .pane');
const paneText = returnText($pane);

const userDetails = returnText('#app .user > .user__details');
```