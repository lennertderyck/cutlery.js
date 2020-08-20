---
title: node
parameters: node[, multiple = false]
description: Simple function to return a node
---

- **node** *css-selector*: css-selector of an element
- **multiple** *boolean*:  return single node or node-list (querySelectorAll)

---

```js
/**
 * in this example you would have a list of cards on a page,
 * set the second parameter to `true` to return a nodelist, false by default
*/
const footer = node('#app footer');
const cards = node('#app > .cards > .card', true); 
```
