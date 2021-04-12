/*
* cutlery.js 3.7.0 - https://github.com/lennertderyck/cutleryjs
* Licensed under the GNU GPLv3 license - https://choosealicense.com/licenses/gpl-3.0/#
*
* Copyright (c) 2021 Lennert De Ryck
*/

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
    
    // TODO: Detect if element has [data-action] selector
    
    try {
        if (action == true) target = event.target.closest(`[data-action="${selector}"]`);
        else target = event.target.closest(selector);
        if (target) callback(target);
    } catch (error) {
        console.error(`Something went wrong on event callback. Use the correct selector – Didn\'t use the [data-action] selector? Add ${false} as third argument`);
    }
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
    const nameElements = formNode.querySelectorAll('input[name], select[name], textarea[name], datalist[name], output[name]');
    
    nameElements.forEach(node => {
        const tag = returnTag(node);
        const inputType = node.getAttribute('type');
        names.add({
            name: node.getAttribute('name'),
            type: inputType ? inputType : tag
        });
    });
    
    names.forEach(i => {
        const value = formData.getAll(i.name);
        if (i.type == 'number') returnData.set(i.name, parseFloat(value[0]))
        else if (i.type == 'checkbox') returnData.set(i.name, value != null ? value == 'on' ? true : value : false)
        else returnData.set(i.name, value[0])
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
            this.response = await fetch(this.url, this.options)
            return this.response;
        }
        catch {
            throw new Error('Something went really wrong fetching this api', url)
        }
    }
    
    async status() {
        const response = await this.fetch();
        return response
    }
    
    async JSON() {
        const response = await this.fetch();
        return response.json();
    }
    
    async TEXT() {
        const response = await this.fetch();
        return response.text();
    }
    
    // async NODE() {
    //     const text = await this.TEXT();
        
    //     const temp = document.createElement('template');
    //     temp.innerHTML = text;
    //     // const content = temp.content.cloneNode(true);
        
    //     return temp.outerHTML;
    // }
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
    
    update(id, data, callback) {
        const localData = this.getData();
        const item = this.item({__id: id});
        const keys = Object.keys(data)
        
        keys.map(key => {
            console.log(data[key])
            console.log(item[key])
        })
        
        if (callback) callback();
        
        for (const i = 0; i < item.length; i++) {
            if (item[i].__id === id) {
              item[i].Username = newValue;
              return;
            }
          }
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
 * @param {boolean} multiple set to true if you want to return multiple nodes as an array
 */
export const returnNode = (el, multiple = false) => {
    if (typeof el == 'object') return el;
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

export const connection = {
    state() {
        const online = window.navigator.onLine;
        const connection = online ? navigator.connection.effectiveType : online;
        
        console.log(`Connection types:\n0: offline\n1: slow\n2: good\n3: strong`);
        
        return {
            false: 0,
            'slow-2g': 1,
            '2g': 1,
            '3g': 2,
            '4g': 3,
        }[connection];
    },
    
    watch(callback = null) {     
        navigator.connection.addEventListener('change', () => {
            const state = connection.state();
            callback(state);
        });
    }
}

/**
 * creates a toast
 * @param {string} title title for the toast
 * @param {string} content bodytext for the toast
 * @param {number} timer the time that a toast will be visible, in milliseconds
 */
export class Toast {
    constructor({title, content, timer = 6000, classes = [], attributes = []}) {
        const animateDuraction = 2000;
        
        this.toast = new Element('div');
        this.toast.class(['toast', 'animate__animated', 'animate__fadeInUp', 'animate__faster', ...classes]);
        this.toast.inner(`
            <div class="toast__wrapper">
                <div class="toast__controls">
                <div data-action="closeToast">
                    <i class='bx bx-x'></i>
                </div>
                </div>
                <div class="toast__content">
                <h5 class="toast__title">${title}</h5>
                <div class="toast__body">
                    <p>${content}</p>
                </div>
                </div>
            </div>
            <div class="toast__timer"></div>
        `);
        
        this.toast.attributes([
            ['style', `--timer-duration: ${timer}ms`]
        ])
        
        this.toast.append('#toasts .toasts__wrapper');
        
        // hide toast 
        setTimeout(() => {  
            fadeOutNode(this.toast.return());    
        }, timer)
        
        // remove toast after being hidden
        setTimeout(() => {      
            this.toast.return().remove();
        }, timer + animateDuraction)
    }
}
  
const fadeOutNode = (el) => {
    el.classList.remove('animate__fadeInUp');
    el.classList.add('animate__fadeOutDown');
}

/**
 * add text to cliboard
 * @param {string} text the text that has to be copied
 */

export const updateClipboard = async (text) => {
    const {state} = await navigator.permissions.query({name: "clipboard-write"});
    if (state == "granted" || state == "prompt") try {
        await navigator.clipboard.writeText(text);
        console.log('copied');
    } catch (error) {
        console.error(error);
    }
}

/**
 * check if an anker element leads to an external url
 * @param {(string|node)} el the anker element that is checked
 * @param {string} slug if the page you want to check has a slug you want to left out
 */

export const linkRouting = (el, slug = '') => {
    const target = returnNode(el);
    const href = el.href;
    const local = window.location.href.replace(window.location.hash, '') + slug;
    
    if (href.startsWith(local)) window.open(href, '_self');
    else window.open(href, '_blank');
}

/**
 * BETA FUNCTIONS
 */

Node.prototype.on = function (type) {
    const hasOn = type.startsWith('on'), isDefined = this[type] === undefined;
    type = hasOn == false ? `on${type}` : type;
    
    if (isDefined == false) throw new Error(`This type of event (${type}) doesn\'t exist`);
    return (funct) => this[type] = funct;
}

// Array.prototype.selectOr = function() {
//     console.log(this)
// };

export class AppErr {
    constructor(data) {
       this.send(data)
    }
    
    async send({title = null, message = null, url = window.location.href, error = null}) {
        const res = await fetch(`http://err.lennertderyck.be/api/new?title=${title}&message=${message}&url=${url}&error=${error}`);
        if (!res.error) console.log('New app-error logged', await res.json());
        else console.log('Something went wrong when logging error', await res.json());
    }
}