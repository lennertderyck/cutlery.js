import sass from 'sass'
import * as fs from 'fs';

const packageData = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

const copyright = 
`/*
* cutlery.js ${packageData.version} - https://github.com/lennertderyck/cutleryjs
* Licensed under the GNU GPLv3 license - https://choosealicense.com/licenses/gpl-3.0/#
*
* Copyright (c) ${new Date().getFullYear()} Lennert De Ryck
*/

`;

const options = {
    src: './scss/index.scss',
    out: './dist/css'
};

const write = {
    normal() {
        const result = sass.renderSync({
            file: options.src,
            sourceMap: true,
            outputStyle: 'expanded',
            outFile: options.out
        });
        
        fs.writeFile(`${options.out}/index.css`, copyright + result.css.toString(), (err) => {
            if (err) throw err;
            console.log('Saved!');
        });
    },
    
    minified() {
        const result = sass.renderSync({
            file: options.src,
            sourceMap: true,
            outputStyle: 'compressed',
            outFile: options.out
        });
        
        fs.writeFile(`${options.out}/index.min.css`, copyright + result.css.toString(), (err) => {
            if (err) throw err;
            console.log('Saved!');
        });
    },
    
    all() {
        write.normal();
        write.minified();
    }
}

write.all();