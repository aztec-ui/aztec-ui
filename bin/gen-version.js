const $fs = require('fs');
const $path = require('path');

const pkg = JSON.parse($fs.readFileSync($path.resolve(__dirname, '../package.json')));
$fs.writeFileSync($path.resolve(__dirname, '../src/version.tsx'), `
// Auto Genrated by 'npm run gen-version'
export default "${pkg.version}";

`.trim());