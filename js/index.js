const node = (selector, multiple = false) => {
    if (multiple == false) return document.querySelector(selector);
    return document.querySelectorAll(selector);
}

class Element {
    constructor(tagname) {
        if (typeof tagname != 'string') throw new Error('The tagname of this new element is not of the type string')
        try {this.el = document.createElement(tagname);}
        catch (err) {
            console.error('Something went wrong when creating a new element. We logged the error message for you convenience:');
            console.log(err);
        }
    }
    
    class(array) {
        if (typeof array != 'object') throw new Error('You should use an array for adding classes to an element')
        try {array.map(i => this.el.classList.add(i))}
        catch (err) {
            console.error('Something went wrong when adding classes. We logged this element and the error message for you convenience:');
            console.log(err);
            console.log(this.el);
        }
    }
    
    attributes(array) {
        if (typeof array != 'object') throw new Error('You should use an array for adding attributes to an element')
        try {array.map(i => this.el.setAttribute(i[0], i[1]))}
        catch (err) {
            console.error('Something went wrong when adding attribtues. We logged this element and the error message for you convenience:');
            console.log(err);
            console.log(this.el);
        }
    }
    
    inner(input) {
        this.el.innerHTML = input;
    }
    
    log() {
        console.log(this.el);
    }
    
    append(node = 'html body', type = 'selector') {
        if (typeof node == 'string') node = document.querySelector(node)
        else if (typeof node == 'object') node = node
        
        try {node.appendChild(this.el);}
        catch (err) {
            console.error('Something went wrong when adding an element. You\'ve probably entered a wrong selector or node element. We logged this element and the error message for you convenience:');
            console.log(err);
            console.log(this.el);
        }
    }
    
    prepend(node = 'html body', type = 'selector') {
        if (typeof node == 'string') node = document.querySelector(node)
        else if (typeof node == 'object') node = node
        
        try {node.prepend(this.el);}
        catch (err) {
            console.error('Something went wrong when adding an element. You\'ve probably entered a wrong selector or node element. We logged this element and the error message for you convenience:');
            console.log(err);
            console.log(this.el);
        }
    }
    
    return() {
        return this.el;
    }
}

const eventCallback = (selector, callback, action = true) => {
    let target = null;
    
    if (action == true) target = event.target.closest(`[data-action="${selector}"]`);
    else target = event.target.closest(selector);
    
    if (target) callback(target);
}

const getFormData = (formNode) => {
    // https://stackoverflow.com/a/14438954/9357283
    
    const names = new Set();
    const formData = new FormData(formNode);
    const returnData = new Map();
    const nameElements = formNode.querySelectorAll('[name]');
    
    nameElements.forEach(node => {
        names.add({
            name: node.getAttribute('name'),
            type: node.getAttribute('type') || 'textarea'
        });
    });
    
    names.forEach(i => {
        returnData.set(i.name, i.type == 'number' ? parseFloat(formData.get(i.name)) : formData.get(i.name))
    })
    
    return returnData;
}

export {
    node,
    Element,
    eventCallback,
    getFormData
}
