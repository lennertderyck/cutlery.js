---
title: returnTag
parameters: node
description: Returns the tagname of an element
---

- **node** *css-selector* | *node*: a css-selector or an actual node

---

```js
const all = document.querySelectorAll('*');
all.forEach(el => {
    console.log(returnTag(el));
})
```