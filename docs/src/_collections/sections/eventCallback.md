---
title: eventCallback
parameters: selector, callback[, action = true]
description: Execute code when a eventlistener is triggered
---

- **node** *selector*: a css-selector
- **callback** *function*: the code that will be executed, returns the event target
- **action** *boolean*: set to `false` if the element that has to be detected isn't defined by a ```data-action``` attribute

---

You would use this function if you want to limit the eventlisteners you add to a page.

**How you would use this function**
- Add it inside an eventlistener
- Set the selector-parameter to the css-selector of the element that you want to detect
- Add code that has to be executed when the element is detected

#### Examples
Stand-alone function, outside eventlistener;

```html
<button data-do="hideMenu">hide menu</div>
<div class="menu">
    menustuff...
</div>
```

```js
eventCallback('btn[data-do="hideMenu"]', (target) => {
    hideSomething(target);
}, false)
```

#### How it works

When the function is launched it watches the target element of the eventlistener. If the css-selector of this element matches the given selector the callback will be executed.

So you could have a couple of buttons, with like a data-attribute, with inside them an icon and some span-elements. What would happen in a normal case: you'd click inside the button, on a span. But on the click event you want to return the value of the data-attribute. Since you clicked on that span element inside the button it would return nothing and probably break a function or two since it doesn't returns a value.

Now with this function you'd click inside the button, but with the css-selector set to something like ```button[data-do-on-click]``` you could click inside the button, on a span, the function would only return the button, so the css-selector works like a filter and will select the element closest to it.

For more information about this aspect of the function read about the [closest](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest)-function.