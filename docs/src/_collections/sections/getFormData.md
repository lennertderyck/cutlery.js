---
title: getFormData
description: Retrieve formdata, without submitting
parameters: form
---

- **form** *css-selector* | *node*: the form itself as css-selector or an actual node, most of the time this is the event target of an (submit) eventlistener

---

Just add the form as parameter and when the function is called it returns a Map object.

The map keys are the name-values of the form elements. Input-elements that don't have a name-attribute will be ignored since the build in FormData API in browsers requires a name-attribute-value.

#### Examples
Stand-alone function, outside eventlistener;

```js
const newUserForm = document.querySelector('#newUserForm');
const newUserData = getFormData(newUserForm); // returns Map object
```

Combined with an eventlistener and [eventCallback-function](#eventcallback);

```js
window.eventListener('submit', () => {
    eventCallback('#newUserForm', (target) => {
        const newUserData = getFormData(target); // returns Map object
    }, false)
})
```

#### Why this function

It's far more convenient than manually selecting all form elements and getting their values.

Just one function returns all the function.

#### Return of input-types
This is how values will be returned from different types of input fields.

**text | passwords | textarea**<br>
Just text will be returned

**number | ranges**<br>
These values will be converted in numbers and returned

**file**<br>
A file field will return all properties of this field as an json object.
