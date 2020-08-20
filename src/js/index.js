/**
  * return a node by css selector
  * @param {string} selector the selector of the element you want to return
  * @param {boolean} multiple set to true if you want to return multiple nodes as an array
  */
export const node = (selector, multiple = false) => {
    const elements = document.querySelectorAll(selector);
    if (multiple == false) return elements[0];
    return elements;
}

/**
 * create new nodes
 */
export class Element {
    /**
     * 
     * @param {string} tagname give the tagname of the type of element you want to create
     */
    constructor(tagname) {
        if (typeof tagname != 'string') throw new Error('The tagname of this new element is not of the type string')
        try {this.el = document.createElement(tagname);}
        catch (err) {
            console.error('Something went wrong when creating a new element. We logged the error message for you convenience:');
            console.log(err);
        }
        
        this.content = '';
    }
    
    /**
     * 
     * @param {array} array the classes you want to add to the created element
     */
    class(array) {
        if (typeof array != 'object') throw new Error('You should use an array for adding classes to an element')
        try {array.map(i => this.el.classList.add(i))}
        catch (err) {
            console.error('Something went wrong when adding classes. We logged this element and the error message for you convenience:');
            console.log(err);
            console.log(this.el);
        }
    }
    
    /**
     * 
     * @param {array} array set attributes for the created element with nested array: 
     * [
     *  ['attribute-name', 'attribute value']
     *  ['attribute-name', 'attribute value']
     * ]
     * 
     */
    attributes(array) {
        if (typeof array != 'object') throw new Error('You should use an array for adding attributes to an element')
        try {array.map(i => this.el.setAttribute(i[0], i[1]))}
        catch (err) {
            console.error('Something went wrong when adding attribtues. We logged this element and the error message for you convenience:');
            console.log(err);
            console.log(this.el);
        }
    }
    
    /**
     * 
     * @param {string} input set the innerHTML of the element
     */
    inner(input) {
        this.el.innerHTML = input || this.content;
    }
    
    log() {
        console.log(this.el);
    }
    
    /**
     * 
     * @param {(node|string)} node css selector or a node
     */
    append(node = 'html body') {
        if (typeof node == 'string') node = returnNode(node);
        else if (typeof node == 'object') node = node;
        
        try {node.appendChild(this.el);}
        catch (err) {
            console.error('Something went wrong when adding an element. You\'ve probably entered a wrong selector or node element. We logged this element and the error message for you convenience:');
            console.log(err);
            console.log(this.el);
        }
    }
    
    /**
     * 
     * @param {(node|string)} node css selector or a node
     */
    prepend(node = 'html body') {
        if (typeof node == 'string') node = returnNode(node);
        else if (typeof node == 'object') node = node
        
        try {node.prepend(this.el);}
        catch (err) {
            console.error('Something went wrong when adding an element. You\'ve probably entered a wrong selector or node element. We logged this element and the error message for you convenience:');
            console.log(err);
            console.log(this.el);
        }
    }
    
    return(format) {
        if (!format || 'node') return this.el;
        if (format == 'html') return this.el.outerHTML
    }
}

/**
 * set callback to excecute when the given selector en the selector of the event.target are equal
 * @param {string} selector css selector to match the event.target element of an eventListener
 * @param {callback} callback executed script when selectors match
 * @param {boolean} action set to true if the element that has to match is identified by a `data-action` attribute
 */
export const eventCallback = (selector, callback, action = true) => {
    let target = null;
    
    if (action == true) target = event.target.closest(`[data-action="${selector}"]`);
    else target = event.target.closest(selector);
    
    if (target) callback(target);
}

/**
 * extract formdata, returns a Map object
 * @param {string} formNode css selector of the form
 */
export const getFormData = (formNode) => {
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

/**
 * set, remove and read cookies
 */
export const cookies = {
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

/**
 * fetch api data and choose the output format
 */
export const fetchAPI = {
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
    },
    
    async html(url) {
        
    }
}

/**
 * a more complex api to fetch data, wip
 */
export class Api {
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

export class LocalDB {
    constructor(name) {
        this.name = name;
        this.data = [];
        
        if (this.exist() == false) window.localStorage.setItem(name, JSON.stringify({name: this.name, data: this.data}));
    }
    
    getData() {
        const localData = window.localStorage.getItem(this.name)
        if (localData) return JSON.parse(localData).data;
        return 'There is no localStorage item with this name';
    }
    
    exist() {
        const item = window.localStorage.getItem(this.name);
        if (item) return item;
        return false;
    }
    
    detatch() {
        window.localStorage.removeItem(this.name);
        console.log(`local database '${this.name}' removed`)
        return this.name;
    }
    
    store(data) {
        window.localStorage.setItem(this.name, JSON.stringify({name: this.name, data: data}));
    }
    
    addMeta(data) {
        data.map(i => {
            i.__id = new Date().getTime();
        })
    }
    
    add(data, callback) {
        const localData = this.getData();
        
        const newData = Array.isArray(data) == false ? [data] : data;
        this.addMeta(newData);
        
        this.data = Array.isArray(data) == false ? [...localData, ...newData] : [...localData, ...newData];
        this.store(this.data);
        
        if (callback) callback();
    }
    
    remove(data, callback) {
        const localData = this.getData();
        const allowed = Object.keys(data)[0];
        
        const index = localData.findIndex((record) => {
            return record[allowed] == data[allowed];
        })
        localData.splice(index, 1);
        this.store(localData);
        
        if (callback) callback();
    }
    
    item(data) {
        const localData = this.getData();
        const allowed = Object.keys(data)[0];
        
        return localData.find((record) => {
            return record[allowed] == data[allowed];
        })
    }
    
    count() {
        const localData = this.getData();
        return localData.length;
    }
    
    empty() {
        this.store([]);
    }
}

/**
 * returns a node, even if the paramter is set by a string
 * checks if the given attribute is a node, if not it will select and return the node by its selector
 * @param {(string|node)} el 
 * @param {*} multiple set to true if you want to return multiple nodes as an array
 */
export const returnNode = (el, multiple = false) => {
    if (typeof el == 'node') return el;
    if (typeof el == 'string') {
        const nodes = document.querySelectorAll(el);
        
        if (multiple == false) return nodes[0]
        else return nodes;
    }
}

/**
 * returns the tagname of an element
 * @param {(string|nodes)} el 
 */
export const returnTag = (el) => {
    return returnNode(el).tagName.toLowerCase();
}

/**
 * return the fieldtype of an input element
 * when the parameter is a form then all input elements are returned with their type as a Map object
 * @param {(string|node)} el css selector or node
 */
export const fieldTypes = (el) => {
    const formTypes = new Map();
    const element = returnNode(el);
    const type = returnTag(el);
    
    if (type == 'form') {
        const formElements = element.querySelectorAll('input, textarea');
        formElements.forEach(i => {
            if (i.type && i.name) formTypes.set(i.name, i.type);
            else if (returnTag(i) == 'textarea') formTypes.set(i.name, 'textarea');
            else formTypes.set('no name', i.type);
        })
        return formTypes;
    };
    if (type == 'input' && element.type) return element.type;
    if (type == 'textarea') return 'textarea';
    return 'no element found or type specified';
}
