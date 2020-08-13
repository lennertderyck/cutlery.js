import sass from 'sass'
import * as fs from 'fs';
import {copyright} from '../copyright.js';

const options = {
    src: './src/scss/index.scss',
    out: './dist/css'
};

export const build = {
    normal() {
        const result = sass.renderSync({
            file: options.src,
            sourceMap: true,
            outputStyle: 'expanded',
            outFile: options.out
        });
        
        fs.writeFile(`${options.out}/index.css`, copyright + result.css.toString(), (err) => {
            if (err) throw err;
            console.log(`saved ${options.out}/index.css!`);
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
            console.log(`saved ${options.out}/index.min.css!`);
        });
    },
    
    async all() {
        const packageData = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
        console.log(`%cSass v${packageData.version} is parsing\n`, 'color: green;');
        
        build.normal();
        build.minified();
    }
}