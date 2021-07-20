module.exports = {

APP_DIR: './src/graphics',
COMMON: './src/common',
BB_CHARTS: '../../common/bb_charts',
BUILD_MANIFEST: './projects.json',
SELECTED_APPS: require('../projects.json'),

interactive_template: `import '../../common/styles/styles-no-tailwind.scss';
import '../../common/styles/fonts.scss';
import $ from 'jquery';
import { bb } from 'billboard.js';
const d3 = Object.assign({}, require('d3'), require('d3-svg-annotation'), require('d3-format'), require('d3-geo'));
let graphic, target
console.log($, d3, bb, graphic, target)
// GENERATE GRAPHIC
`,

interactive_dependencies: `{ "jquery": "^3.4.0",
"billboard.js": "^1.8.0",
"d3": "^5.9.2",
"d3-svg-annotation": "^2.5.0"
}`,

interactive_scripts: `{"bb": "node ../../../utils/bb_cli.js"}`,

custom_template: `''`,

}
