import sass from 'sass'
import * as fs from 'fs';
import {copyright} from '../copyright.js';

const options = {
    src: './src/scss/index.scss',
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