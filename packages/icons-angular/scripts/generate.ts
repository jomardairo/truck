import * as allIconDefs from '@ant-design/icons-svg';
import { IconDefinition, ThemeType } from '@ant-design/icons-svg/es/types';
import { renderIconDefinitionToSVGElement } from '@ant-design/icons-svg/lib/helpers';
import { promises as fsPromises } from 'fs';
import { template } from 'lodash';
import * as path from 'path';

export type AngularTheme = 'fill' | 'outline' | 'twotone';

interface IconDefinitionWithIdentifier extends IconDefinition {
  svgIdentifier: string;
}

function walk<T>(fn: (iconDef: IconDefinitionWithIdentifier) => Promise<T>) {
  return Promise.all(
    Object.keys(allIconDefs).map(svgIdentifier => {
      let iconDef = (allIconDefs as { [id: string]: IconDefinition })[
        svgIdentifier
      ];

      return fn({ svgIdentifier, ...iconDef });
    })
  );
}

/**
 * There's a breaking of the underlying dependency but Angular don't have to
 * break too.
 * @param name theme
 */
function adaptTheme(name: string): string {
  return name.replace(/illed$/, 'ill').replace(/utlined$/, 'utline');
}

async function generateIcons() {
  let iconsDir = path.join(__dirname, '../src/icons');
  try {
    await fsPromises.access(iconsDir);
  } catch {
    await fsPromises.mkdir(iconsDir);
  }

  let indexRender = template(`
<%= content %>`);
  let indexContent: string[] = [];

  let manifestRender = template(`
import { Manifest } from './types';

export let manifest: Manifest = {
  fill: [
    <%= fill %>
  ],
  outline: [
    <%= outline %>
  ],
  twotone: [
    <%= twotone %>
  ]
}`);
  let manifestContent: {
    fill: string[];
    outline: string[];
    twotone: string[];
  } = {
    fill: [],
    outline: [],
    twotone: []
  };

  let staicFileRender = template(
    `
import { IconDefinition } from '@ant-design/icons-angular';

export let <%= svgIdentifier %>: IconDefinition = {
    name: '<%= name %>',
    theme: '<%= theme %>',
    icon: '<%= inlineIcon %>'
}`.trim()
  );

  let svgRender = template(`<%= inlineIcon %>`);

  let jsonpRender = template(
    `
(function() {
  __ant_icon_load({
      name: '<%= name %>',
      theme: '<%= theme %>',
      icon: '<%= inlineIcon %>'
  });
})()
`.trim()
  );

  await walk(async ({ svgIdentifier, name, theme, icon }) => {
    let inlineIcon = renderIconDefinitionToSVGElement({ name, theme, icon });

    svgIdentifier = adaptTheme(svgIdentifier);

    let _theme = adaptTheme(theme) as AngularTheme;

    // Generate static loading resources.
    await fsPromises.writeFile(
      path.resolve(__dirname, `../src/icons/${_theme}/${svgIdentifier}.ts`),
      staicFileRender({ svgIdentifier, name, theme: _theme, inlineIcon })
    );

    await fsPromises.writeFile(
      path.resolve(__dirname, `../src/inline-svg/${_theme}/${name}.svg`),
      svgRender({ inlineIcon })
    );

    await fsPromises.writeFile(
      path.resolve(__dirname, `../src/inline-svg/${_theme}/${name}.js`),
      jsonpRender({ name, theme: _theme, inlineIcon })
    );

    indexContent.push(
      `export { ${svgIdentifier} } from './${_theme}/${svgIdentifier}';`
    );

    manifestContent[_theme].push(`'${name}'`);
  });

  await fsPromises.writeFile(
    path.resolve(__dirname, `../src/icons/public_api.ts`),
    indexRender({ content: indexContent.join('\n') })
  );

  await fsPromises.writeFile(
    path.resolve(__dirname, `../src/manifest.ts`),
    manifestRender({
      fill: manifestContent.fill.join(', '),
      outline: manifestContent.outline.join(', '),
      twotone: manifestContent.twotone.join(', ')
    })
  );
}

generateIcons();
