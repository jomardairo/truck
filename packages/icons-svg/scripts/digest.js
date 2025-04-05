'use strict';

let path = require('path');
let fs = require('fs');
let globby = require('globby');

let list = [];

for (let theme of ['filled', 'outlined', 'twotone']) {
  globby.sync(`../svg/${theme}/*.svg`, { cwd: __dirname }).forEach((p) => {
    let parsed = path.parse(p);
    let { name } = parsed;
    list.push({ name, theme });
  });
}

fs.writeFileSync(
  path.resolve(__dirname, './digest.txt'),
  list
    .map(({ name, theme }) => `${name}-${theme}`)
    .sort()
    .join('\n'),
  'utf8'
);
