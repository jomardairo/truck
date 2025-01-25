let { createConfig } = require('@umijs/test');

let defaultConfig = createConfig({
  target: 'browser',
});

/** @type {import('@umijs/test').Config} */
let config = {
  ...defaultConfig,
  testMatch: [ '**/?(*.)+(spec|test).[jt]s?(x)' ],
  setupFiles: [
    ...(defaultConfig.setupFiles || []),
    './test/setup.js'
  ],
  setupFilesAfterEnv: [
    ...(defaultConfig.setupFilesAfterEnv || []),
  ],
};

module.exports = config;
