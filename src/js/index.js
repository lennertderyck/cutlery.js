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

const cookies = {
    set(name, value, days) {
        if (days) {
            const date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "expires="+date.toGMTString();
        }
        else var expires = '';
        document.cookie = `${name}=${value}; ${expires}; path=/`
    },
    
    get(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    },
}

const fetchAPI = {
    async json(url, options = {method: 'GET'}) {
        try {
            let response = await fetch(url, options)
            let data = await response.json();
            return data;
        }
        catch {
            throw new Error('Something went really wrong fetching this api', url)
        }
    },
    
    async text(url, options = {method: 'GET'}) {
        try {
            let response = await fetch(url, options)
            let data = await response.text();
            return data;
        }
        catch {
            throw new Error('Something went really wrong fetching this api', url)
        }
    }
}

class Api {
    constructor(url, options = {method: 'GET'}) {
        this.url = url;
        this.options = options
    }
    
    async fetch(options = this.options) {
        try {
            this.response = await fetch(url, options)
            return this.response;
        }
        catch {
            throw new Error('Something went really wrong fetching this api', url)
        }
    }
    
    async JSON() {
        this.data = await this.response.json();
        return this.data;
    }
    
    async TEXT() {
        this.data = await this.response.text();
        return this.data;
    }
    
    async HTML() {
        const text = this.TEXT();
        
        const temp = new Element('template');
        temp.inner(text);
        
        return temp;
    }
}

export {
    node,
    Element,
    eventCallback,
    getFormData,
    cookies,
    fetchAPI,
    Api
}