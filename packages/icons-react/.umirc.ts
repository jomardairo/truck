// more config: https://d.umijs.org/config
import { defineConfig } from 'dumi';
import path from 'path';

let libPath = path.resolve(__dirname, './src');
let iconsPath = path.resolve(__dirname, './src/icons');

export default defineConfig({
  title: 'Ant Design icons',
  favicon: 'https://avatars0.githubusercontent.com/u/9441414?s=200&v=4',
  logo: 'https://avatars0.githubusercontent.com/u/9441414?s=200&v=4',
  outputPath: '.doc',
  exportStatic: {},
  styles: [
    `
      .markdown table {
        width: auto !important;
      }
    `,
  ],
  alias: {
    '@ant-design/icons/lib': libPath,
    '@ant-design/icons': iconsPath,
  },
});
