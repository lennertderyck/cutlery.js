import minify from 'minify';
import * as fs from 'fs';

const packageData = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

const copyright = 
`/*!
* cutlery.js ${packageData.version} - https://github.com/lennertderyck/cutleryjs
* Licensed under the GNU GPLv3 license - https://choosealicense.com/licenses/gpl-3.0/#
*
* Copyright (c) ${new Date().getFullYear()} Lennert De Ryck
*/

`;


const options = {
    minify: {
        html: {
            removeAttributeQuotes: false,
            removeOptionalTags: false
        },
    },
    src: './js/index.js',
    out: './dist/js'
};

const write = {
    normal() {
        fs.readFile(options.src, (err, result) => {
            fs.writeFile(`${options.out}/index.js`, copyright + result, (err) => {
                if (err) throw err;
                console.log('Saved!');
            });
        });
    },
    
    minified() {
        minify(options.src, options.minify)
        .then(result => {
            fs.writeFile(`${options.out}/index.min.js`, copyright + result, (err) => {
                if (err) throw err;
                console.log('Saved!');
            });
        })
        .catch(console.error);
    },
    
    all() {
        write.normal();
        write.minified();
    }
}

write.all();