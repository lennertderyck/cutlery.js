import {node, returnNode, eventCallback} from 'https://unpkg.com/cutleryjs/dist/js/index.js'

const copyToPasteboard = (selector) => {
    const target = event.target.closest('pre')
    if (target) {
        const text = target.innerText;
        navigator.permissions.query({name: "clipboard-write"}).then(result => {
            if (result.state == "granted" || result.state == "prompt") updateClipboard(text);
        });
    }
}

const updateClipboard = (newClip) => {
    navigator.clipboard.writeText(newClip).then(() => {
      console.log('written to clipboard')
    }, () => {
      console.log('couldn\'t write to clipboard')
    });
}

document.addEventListener('click', (event) => {
    copyToPasteboard();
})

// route external urls to a new tab
const linkRouting = (node) => {
    const target = returnNode(node);
    const href = node.href;
    const local = window.location.href.replace(window.location.hash, '');
    
    console.log(local);
    console.log(href);
    
    if (href.startsWith(local)) window.open(href, '_self');
    else window.open(href, '_blank');
}

const replaceContent = (selector, content) => {
    const elements = returnNode(selector, true);
    elements.forEach(element => {
        element.innerHTML = content;
    });
}

const year = new Date().getFullYear();
replaceContent('[data-replace="copyright"]', `
    Lennert De Ryck ･ ${year} – ${year+1}
`)

window.addEventListener('scroll', (event) => {
    const scroll = window.scrollY;
    const header = node('header');
    if (scroll >= 200) {
        header.classList.add('header--small');
        header.classList.remove('header--normal');
    } else {
        header.classList.remove('header--small');
        header.classList.add('header--normal');
    }
})

window.addEventListener('click', (event) => {
    eventCallback('a', (target) => {
        event.preventDefault();
        linkRouting(target);
    }, false)
})