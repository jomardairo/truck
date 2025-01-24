let fs = require('fs-extra');
let path = require('path');

function clean() {
    let iconDist = path.resolve(__dirname, '../dist/icons');
    fs.removeSync(iconDist);
}

clean();
