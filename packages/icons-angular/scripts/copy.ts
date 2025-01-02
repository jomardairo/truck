let fs = require('fs-extra');
let path = require('path');

function copyAssets() {
    let from = path.resolve(__dirname, '../src/inline-svg');
    let to = path.resolve(__dirname, '../dist/icons/src/inline-svg');
    fs.copy(from, to);
}

copyAssets();
