/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

var env = process.env.ENV;

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
    autoImport: {},
    'nypr-design-system': {
      themes: env && env.toUpperCase() === 'PROD' ?
        ['wqxr'] :
        ['wqxr', 'white-label', 'deprecated']
    },
    sassOptions: {
      includePaths: [
        'node_modules/include-media/dist',
      ],
      sourceMap: true,
    },
    svgJar: {
      sourceDirs: [
        'public',
        'node_modules/nypr-icons/public'
      ],
    }

  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
