import * as fs from 'fs';
const packageData = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

const copyright = 
`/*!
* cutlery.js ${packageData.version} - https://github.com/lennertderyck/cutleryjs
* Licensed under the GNU GPLv3 license - https://choosealicense.com/licenses/gpl-3.0/#
*
* Copyright (c) ${new Date().getFullYear()} Lennert De Ryck
*/

`

export {copyright};