import minify from 'minify';
import * as fs from 'fs';
import {copyright} from '../copyright.js';
import babel from "@babel/core";

const options = {
    minify: {
        html: {
            removeAttributeQuotes: false,
            removeOptionalTags: false
        },
    },
    babel: {
        plugins: [
            "@babel/plugin-transform-arrow-functions", 
            "@babel/plugin-transform-modules-commonjs"
        ],
        presets: ["minify"]
    },
    src: './src/js/index.js',
    out: './dist/js/index.js',
    outMin: './dist/js/index.min.js',
    outLegacy: './dist/js/legacy.js',
    outLegacyMin: './dist/js/legacy.min.js'
};

export const build = {
    normal() {
        const file = fs.readFileSync(options.src);
        return file;
    },
    
    minified() {
        return minify(options.src, options.minify);
    },
    
    async legacy() {
        try {
            const parsed = await babel.transformFileAsync(options.src, options.babel)
            return parsed.code;
        } catch {console.log(`${options.src} couldn't be parsed by Babel`)}
    },
    
    minify(file, setOptions) {
        return minify(file, setOptions); // returns minfied
    },
    
    write(code, output, addCopyright = true) {
        try {
            if (addCopyright == true) fs.writeFileSync(output, copyright + code);
            if (addCopyright == false) fs.writeFileSync(output, code);
            console.log(`saved ${output}!`);
        } catch {
            console.log(`${output} couldn't be written`)
        }
    },
    
    async all() {
        const packageData = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
        console.log(`%cJavaScript v${packageData.version} is parsing \n`, 'color: #00ee00;');
        
        // write normal
        build.write(build.normal(), options.out);
        
        // write minified
        const minified = await build.minify(options.src, options.minify);
        build.write(minified, options.outMin);
        
        // write legacy;
        const legacy = await build.legacy();
        build.write(legacy, options.outLegacyMin);
        
        // write legacy minified from legacy — deprecated because of miniy option from babel
        // const legacyMin = await build.minify(options.outLegacy, options.minify);
        // build.write(legacyMin, options.outLegacyMin, false); 
        
        console.log('\nJavaScript is done parsing\n');       
    }
}