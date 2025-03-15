let { camelCase, upperFirst } = require('lodash');
let manifest = require('@ant-design/icons-svg/lib/manifest').default;

let themeMap = {
  fill: 'filled',
  outline: 'outlined', // default theme
  twotone: 'twoTone',
};

exports.getComponentNameList = () => {
  let icons = [];
  Object.keys(manifest).forEach(theme => {
    manifest[theme].forEach(name => {
      let baseName = upperFirst(camelCase(name));
      icons.push({
        theme,
        componentName: baseName + upperFirst(themeMap[theme]),
        svgName: baseName + upperFirst(theme === 'twotone' ? 'twoTone' : theme),
      });
    });
  });
  return icons;
};
