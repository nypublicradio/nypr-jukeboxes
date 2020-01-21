let config = require('./environment');

// Hack to force ember-fastboot-testing to load fastboot app in test environment
// so we can visit localhost:4200/tests and have them pass

// Issue: https://github.com/embermap/ember-cli-fastboot-testing/issues/32

module.exports = {
  resilient: false,
  sandboxGlobals: {},
  // setupFastboot: fastbootInstance => {
  //   process.env.APP_CONFIG = JSON.stringify(config('test'));
  //   fastbootInstance.reload()
  // }
};
