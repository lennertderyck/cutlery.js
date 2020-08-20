---
title: fieldTypes
parameters: node
description: Returns the fieldtype of an input-element
---

- **node** *css-selector* | *node*: a css-selector or an actual node

---

When the node you assign to the function is a form-element, than the function will return a Map object. The keys are the name-attribute-values of the input-elements. Input-elements without a name-attribute will be ignored.

In this function is the [returnTag](#returntag)-function used.

```js
const inputField = fieldTypes('#newUserForm > #newUserName');

const form = document.querySelector('#newUserForm');
const fields = fieldTypes(form);
```