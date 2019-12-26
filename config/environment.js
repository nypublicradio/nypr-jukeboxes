/* eslint-env node */
'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'nypr-jukeboxes',
    environment,
    rootURL: '/',
    locationType: 'auto',
    'ember-cli-mirage': {
      autostart: true // https://github.com/samselikoff/ember-cli-mirage/blob/master/CHANGELOG.md#how-it-works-in-different-types-of-tests
    },
    emberHifi: {
      debug: false
    },
    moment: {
      includeTimezone: 'all'
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    googleFonts: [
      'Open+Sans:400,400i,600',
      'Playfair+Display:900'
    ],
    fastboot: {
      hostWhitelist: process.env.HOST_WHITELIST ? process.env.HOST_WHITELIST.split(',') : []
    },
    siteSlug: 'wqxr',
    siteName: 'WQXR',
    siteId: 2,
    clientSlug: 'wqxr_web',
    webRoot: process.env.JUKEBOX_URL,
    authAPI: process.env.AUTH_SERVICE,
    membershipAPI: process.env.MEMBERSHIP_SERVICE,
    etagAPI: process.env.ETAG_API,
    publisherAPI: process.env.PUBLISHER_API,
    platformEventsAPI: process.env.PLATFORM_EVENTS_SERVICE,
    womsAPI: process.env.WOMS_API,
    womsRestAPI: process.env.WOMS_REST_API,
    wqxrURL: process.env.WQXR_URL,
    googleAnalytics: process.env.GOOGLE_ANALYTICS,
    googleTagManager: process.env.GOOGLE_TAG_MANAGER_ID,
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';

    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.publisherAPI = '/api'; //ember-cli-fastboot-testing needs this
    ENV.webRoot = 'http://example.com';
    ENV.etagAPI = 'http://api.example.com/api/v1/browser_id/';
    ENV.authAPI = 'http://api.example.com/auth';
    ENV.membershipAPI = 'http://api.example.com/membership';
    //ENV.womsRestAPI = 'http://api.example.com/whats-on',
    ENV.womsRestAPI = '/whats-on',

    ENV.platformEventsAPI = 'http://example.com';
    ENV.fastboot.hostWhitelist = ['/.*/'];
    ENV.APP.autoboot = false;

    ENV['ember-clock'] = {
      disabled: true
    };
  }

  if (environment === 'production') {

  }

  return ENV;
};
